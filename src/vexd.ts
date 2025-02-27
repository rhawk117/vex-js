/**
 * @file vex-doc.ts
 * @description Document-level utilities for working with VexdElement.
 */

import { VexdElement } from "./vexd-element";
import { VexdState, StateHook, VexdTimer, VexdInterval } from "./vexd-hooks";

export class vexd {
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

	/**
	 * a simple state management hook that returns a state and an effect function
	 *
	 * "side effects" for when the state changes can be specified using the "effect"
	 * function or the first item in the array
	 *
	 * new state can be set by passing a new value or a function that takes the old
	 * and the current state can be retrieved by calling the state function with no
	 * arguments
	 *
	 * @param initialState - the initial state
	 * @returns
	 */
	static state<T>(initialState: T): VexdState<T> {
		let _state = initialState;
		let _sideEffects: ((newState: T) => void)[] = [];

		const state = (newState: StateHook<T>): T => {
			if (!newState) {
				return _state;
			}
			if (typeof newState === "function") {
				const result = (newState as Function)(_state);
				if (result !== undefined) {
					_state = result;
				}
			} else {
				_state = newState;
			}
			_sideEffects.forEach((fn) => fn(_state));
			return _state;
		};

		const effect = (fn: (newState: T) => void) => {
			_sideEffects.push(fn);
		};

		return [effect, state];
	}

	/**
	 * using the timerFn function, a VexdTimer is created with the
	 * start, stop, and reset methods
	 * @param timerFn
	 * @param ms
	 * @returns
	 */
	static timer(timerFn: () => void, ms: number = 1000): VexdTimer {
		let interval: number | null = null;

		const start = () => {
			if (interval) {
				stop();
			}
			interval = setTimeout(timerFn, ms);
		};

		const stop = () => {
			if (!interval) return;
			clearInterval(interval);
			interval = null;
		};

		const reset = () => {
			stop();
			start();
		};

		return { start, stop, reset };
	}

	static interval(timerFn: () => void, ms: number = 1000): VexdInterval {
		let interval: number | null = null;

		const start = () => {
			if (interval) {
				stop();
			}
			interval = setInterval(timerFn, ms);
		};

		const stop = () => {
			if (!interval) return;
			clearInterval(interval);
			interval = null;
		};

		const reset = () => {
			stop();
			start();
		};

		return { start, stop, reset };
	}
}
