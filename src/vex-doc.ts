/**
 * @file VexDoc.ts
 * @description Document-level utilities for working with VexElement.
 */

import { VexElement } from "./vex-element";

export class vexd {
	/**
	 * equivalent to document.querySelector, but returns a VexElement instance.
	 * @param {string} selector - CSS selector.
	 * @returns {VexElement} A VexElement instance wrapping the selected element.
	 * @throws Will throw an error if no element is found.
	 */
	static select(selector: string): VexElement {
		const el = document.querySelector(selector);
		if (!el) throw new Error(`Element not found for selector: ${selector}`);
		return new VexElement(el as HTMLElement);
	}

	/**
	 * returns a VexElement instance, equivalent to document.getElementById.
	 * @param {string} id - The element's id.
	 * @returns {VexElement} a VexElement instance.
	 * @throws will throw an error if no element is found.
	 */
	static id(id: string): VexElement {
		const el = document.getElementById(id);
		if (!el) throw new Error(`Element not found with id: ${id}`);
		return new VexElement(el);
	}

	/**
	 * equivalent to document.querySelectorAll, but returns an array of VexElement instances.
	 * @param {string} selector - CSS selector.
	 * @param {(vex: VexElement, index: number) => void} callback - Callback for each element.
	 * @returns {VexElement[]} Array of VexElement instances.
	 */
	static each(
		selector: string,
		callback: (vex: VexElement, index: number) => void
	): void {
		const nodeList = document.querySelectorAll(selector);
		Array.from(nodeList).forEach((el, index) => {
			const vex = new VexElement(el as HTMLElement);
			callback(vex, index);
		});
	}

	static all(selector: string): VexElement[] {
		const nodeList = document.querySelectorAll(selector);
		return Array.from(nodeList).map((el) => new VexElement(el as HTMLElement));
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
	 * @returns {VexElement} A VexElement instance wrapping the created <link> element.
	 */
	static importCSS(cssPath: string): VexElement {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = cssPath;
		document.head.appendChild(link);
		return new VexElement(link as HTMLElement);
	}

	/**
	 * removes CSS files that include the given file name.
	 * @param {string} cssFileName - Partial name of the CSS file.
	 * @returns {VexElement[]} Array of VexElement instances for the removed elements.
	 */
	static removeCSS(cssFileName: string): VexElement[] {
		const links = Array.from(
			document.querySelectorAll('link[rel="stylesheet"]')
		);
		const removed: VexElement[] = [];
		links.forEach((link) => {
			if (link.getAttribute("href")?.includes(cssFileName)) {
				link.remove();
				removed.push(new VexElement(link as HTMLElement));
			}
		});
		return removed;
	}

	/**
	 * creates a new element in the document, returned as a vex element.
	 * @param {string} elementName - The tag name for the element.
	 * @returns {VexElement} A VexElement instance wrapping the new element.
	 */
	static create(elementName: string): VexElement {
		const el = document.createElement(elementName);
		return new VexElement(el);
	}

	/**
	 * gets all of the forms in the document with an optional selector to filter them
	 * by
	 * @param {string} [optionalSelector] - Optional CSS selector to filter forms.
	 * @returns {VexElement[]} Array of VexElement instances wrapping form elements.
	 */
	static forms(optionalSelector?: string): VexElement[] {
		let forms: HTMLCollectionOf<HTMLFormElement>;
		if (optionalSelector) {
			forms = document.querySelectorAll(`form${optionalSelector}`) as any;
		} else {
			forms = document.getElementsByTagName("form");
		}
		return Array.from(forms).map((el) => new VexElement(el as HTMLElement));
	}

	/**
	 * equivalent to document.getElementsByTagName
	 * @param {string} tagName - The tag name.
	 * @returns {VexElement[]} Array of VexElement instances.
	 */
	static tags(tagName: string): VexElement[] {
		const tags = document.getElementsByTagName(tagName);
		return Array.from(tags).map((el) => new VexElement(el as HTMLElement));
	}

	/**
	 * equivalent to document.getElementsByClassName
	 * @param {string} className - The class name.
	 * @returns {VexElement[]} Array of VexElement instances.
	 */
	static classed(className: string): VexElement[] {
		const elements = document.getElementsByClassName(className);
		return Array.from(elements).map((el) => new VexElement(el as HTMLElement));
	}

	/**
	 * Provides a reactive signal mechanism.
	 * @template T
	 * @param {T} initialValue - The initial value.
	 * @returns {[ (cb: (oldValue: T, newValue: T) => void) => void, (newValue: T) => void ]}
	 * Subscribe and setState functions.
	 */
	static signal<T>(
		initialValue: T
	): [
		subscribe: (cb: (oldValue: T, newValue: T) => void) => void,
		setState: (newValue: T) => void
	] {
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
		return [subscribe, setState];
	}

	


}
