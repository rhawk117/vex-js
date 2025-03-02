/**
 * @file vex-doc.ts
 * @description Document-level utilities for working with VexdElement.
 */

import { VexdElement } from "./vexd-element";

export class Vexd {
	/**
	 * equivalent to document.querySelector, but returns a VexdElement instance.
	 * @param {string} selector - CSS selector.
	 * @returns {VexdElement} A VexdElement instance wrapping the selected element.
	 * @throws Will throw an error if no element is found.
	 */
	static select(selector: string): VexdElement {
		const el = document.querySelector(selector);
		if (!el) throw new Error(`Element not found for selector: ${selector}`);
		return new VexdElement(el as HTMLElement);
	}

	/**
	 * returns a VexdElement instance, equivalent to document.getElementById.
	 * @param {string} id - The element's id.
	 * @returns {VexdElement} a VexdElement instance.
	 * @throws will throw an error if no element is found.
	 */
	static id(id: string): VexdElement {
		const el = document.getElementById(id);
		if (!el) throw new Error(`vexd-js: Element not found with id: ${id}`);
		return new VexdElement(el);
	}

	/**
	 * equivalent to document.querySelectorAll, but returns an array of VexdElement instances.
	 * @param {string} selector - CSS selector.
	 * @param {(vex: VexdElement, index: number) => void} callback - Callback for each element.
	 * @returns {VexdElement[]} Array of VexdElement instances.
	 */
	static each(
		selector: string,
		callback: (vex: VexdElement, index: number) => void
	): void {
		const nodeList = document.querySelectorAll(selector);
		Array.from(nodeList).forEach((el, index) => {
			const vex = new VexdElement(el as HTMLElement);
			callback(vex, index);
		});
	}

	/**
	 * querySelectorAll but returns an array of VexdElement instances.
	 * @param selector 
	 * @returns 
	 */
	static all(selector: string): VexdElement[] {
		const nodeList = document.querySelectorAll(selector);
		return Array.from(nodeList).map((el) => new VexdElement(el as HTMLElement));
	}

	/**
	 * executes a callback once the DOM is fully loaded.
	 * @param {() => void} callback - Callback function.
	 */
	static ready(callback: () => void): void {
		if (document.readyState !== "loading") {
			callback();
		} else {
			document.addEventListener("DOMContentLoaded", callback);
		}
	}

	/**
	 * sets the document title.
	 * @param {string} title - New title.
	 */
	static title(title: string): void {
		document.title = title;
	}

	/**
	 * creates a new element in the document, returned as a vex element.
	 * @param {string} elementName - The tag name for the element.
	 * @returns {VexdElement} A VexdElement instance wrapping the new element.
	 */
	static create(
		elementName: string,
		options?: ElementCreationOptions
	): VexdElement {
		const el = document.createElement(elementName, options);
		return new VexdElement(el);
	}

	/**
	 * gets all of the forms in the document with an optional selector to filter them
	 * by
	 * @param {string} [optionalSelector] - Optional CSS selector to filter forms.
	 * @returns {VexdElement[]} Array of VexdElement instances wrapping form elements.
	 */
	static forms(optionalSelector?: string): VexdElement[] {
		let forms: HTMLCollectionOf<HTMLFormElement>;
		if (optionalSelector) {
			forms = document.querySelectorAll(`form${optionalSelector}`) as any;
		} else {
			forms = document.getElementsByTagName("form");
		}
		return Array.from(forms).map((el) => new VexdElement(el as HTMLElement));
	}

	/**
	 * equivalent to document.getElementsByTagName
	 * @param {string} tagName - The tag name.
	 * @returns {VexdElement[]} Array of VexdElement instances.
	 */
	static tags(tagName: string): VexdElement[] {
		const tags = document.getElementsByTagName(tagName);
		return Array.from(tags).map((el) => new VexdElement(el as HTMLElement));
	}

	/**
	 * equivalent to document.getElementsByClassName
	 * @param {string} className - The class name.
	 * @returns {VexdElement[]} Array of VexdElement instances.
	 */
	static className(className: string): VexdElement[] {
		const elements = document.getElementsByClassName(className);
		return Array.from(elements).map((el) => new VexdElement(el as HTMLElement));
	}

	/**
	 * creates a VexdElement from a template literal and returns the
	 * "top-level" element or container, if there are multiple only the
	 * first one is returned as to ensure your templates are short as this
	 * shouldn't be used for massive templates
	 */
	static template(
		strings: TemplateStringsArray,
		...values: any[]
	): VexdElement {
		const rawHTML = strings.reduce((result, string, i) => {
			const value = i < values.length ? String(values[i] ?? "") : "";
			return result + string + value;
		}, "");

		const template = document.createElement("template");
		template.innerHTML = rawHTML.trim();

		const content = template.content;
		return new VexdElement(content.firstChild as HTMLElement);
	}


	static on(event: string, callback: VoidFunction): VoidFunction {
		document.addEventListener(event, callback);
		return () => document.removeEventListener(event, callback);
	}
}
