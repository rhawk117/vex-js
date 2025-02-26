/**
 * @file vex-doc.ts
 * @description Document-level utilities for working with VexdElement.
 */

import { VexdElement } from "./vexd-element";

export class vexdoc {
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
		if (!el) throw new Error(`Element not found with id: ${id}`);
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
	 * defines a snippet of HTML that is rendered from an object in the
	 *
	 * @template T
	 * @param {(...args: any[]) => string} template - A template function.
	 * @returns {{ render: (data: T) => string }} An object with a render method.
	 */
	static snippet<T extends object>(
		template: (props: T) => string
	): (data: T) => string {
		return (data: T) => template(data);
	}

	/**
	 * sets the document title.
	 * @param {string} title - New title.
	 */
	static title(title: string): void {
		document.title = title;
	}

	/**
	 * imports a CSS file into the document by creating a <link> element.
	 * @param {string} cssPath - Path to the CSS file.
	 * @returns {VexdElement} A VexdElement instance wrapping the created <link> element.
	 */
	static importCSS(cssPath: string): VexdElement {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = cssPath;
		document.head.appendChild(link);
		return new VexdElement(link as HTMLElement);
	}

	/**
	 * removes CSS files that include the given file name.
	 * @param {string} cssFileName - Partial name of the CSS file.
	 * @returns {VexdElement[]} Array of VexdElement instances for the removed elements.
	 */
	static removeCSS(cssFileName: string): VexdElement[] {
		const links = Array.from(
			document.querySelectorAll('link[rel="stylesheet"]')
		);
		const removed: VexdElement[] = [];
		links.forEach((link) => {
			if (link.getAttribute("href")?.includes(cssFileName)) {
				link.remove();
				removed.push(new VexdElement(link as HTMLElement));
			}
		});
		return removed;
	}

	/**
	 * creates a new element in the document, returned as a vex element.
	 * @param {string} elementName - The tag name for the element.
	 * @returns {VexdElement} A VexdElement instance wrapping the new element.
	 */
	static create(elementName: string): VexdElement {
		const el = document.createElement(elementName);
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
	 * Provides a reactive signal mechanism.
	 * @template T
	 * @param {T} initialValue - The initial value.
	 * @returns {[ (cb: (oldValue: T, newValue: T) => void) => void, (newValue: T) => void ]}
	 * Subscribe and setState functions.
	 */
	static signal<T>(initialValue: T): {
		subscribe: (cb: (oldValue: T, newValue: T) => void) => void;
		setState: (newValue: T) => void;
		getState: () => T;
	} {
		let state = initialValue;
		const subscribers: Array<(oldValue: T, newValue: T) => void> = [];
		const subscribe = (cb: (oldValue: T, newValue: T) => void) => {
			subscribers.push(cb);
		};
		const setState = (newValue: T) => {
			const oldValue = state;
			state = newValue;
			subscribers.forEach((cb) => cb(oldValue, newValue));
		};
		const getState = () => state;
		return { subscribe, setState, getState };
	}
}
