/**
 * @file vex-doc.ts
 * @description Document-level utilities for working with VexdElement.
 */
import { VexdElement } from "./vexd-element";
export declare class vexdoc {
    /**
     * equivalent to document.querySelector, but returns a VexdElement instance.
     * @param {string} selector - CSS selector.
     * @returns {VexdElement} A VexdElement instance wrapping the selected element.
     * @throws Will throw an error if no element is found.
     */
    static select(selector: string): VexdElement;
    /**
     * returns a VexdElement instance, equivalent to document.getElementById.
     * @param {string} id - The element's id.
     * @returns {VexdElement} a VexdElement instance.
     * @throws will throw an error if no element is found.
     */
    static id(id: string): VexdElement;
    /**
     * equivalent to document.querySelectorAll, but returns an array of VexdElement instances.
     * @param {string} selector - CSS selector.
     * @param {(vex: VexdElement, index: number) => void} callback - Callback for each element.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    static each(selector: string, callback: (vex: VexdElement, index: number) => void): void;
    static all(selector: string): VexdElement[];
    /**
     * executes a callback once the DOM is fully loaded.
     * @param {() => void} callback - Callback function.
     */
    static ready(callback: () => void): void;
    /**
     * defines a snippet of HTML that is rendered from an object in the
     *
     * @template T
     * @param {(...args: any[]) => string} template - A template function.
     * @returns {{ render: (data: T) => string }} An object with a render method.
     */
    static snippet<T extends object>(template: (props: T) => string): (data: T) => string;
    /**
     * sets the document title.
     * @param {string} title - New title.
     */
    static title(title: string): void;
    /**
     * imports a CSS file into the document by creating a <link> element.
     * @param {string} cssPath - Path to the CSS file.
     * @returns {VexdElement} A VexdElement instance wrapping the created <link> element.
     */
    static importCSS(cssPath: string): VexdElement;
    /**
     * removes CSS files that include the given file name.
     * @param {string} cssFileName - Partial name of the CSS file.
     * @returns {VexdElement[]} Array of VexdElement instances for the removed elements.
     */
    static removeCSS(cssFileName: string): VexdElement[];
    /**
     * creates a new element in the document, returned as a vex element.
     * @param {string} elementName - The tag name for the element.
     * @returns {VexdElement} A VexdElement instance wrapping the new element.
     */
    static create(elementName: string): VexdElement;
    /**
     * gets all of the forms in the document with an optional selector to filter them
     * by
     * @param {string} [optionalSelector] - Optional CSS selector to filter forms.
     * @returns {VexdElement[]} Array of VexdElement instances wrapping form elements.
     */
    static forms(optionalSelector?: string): VexdElement[];
    /**
     * equivalent to document.getElementsByTagName
     * @param {string} tagName - The tag name.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    static tags(tagName: string): VexdElement[];
    /**
     * equivalent to document.getElementsByClassName
     * @param {string} className - The class name.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    static className(className: string): VexdElement[];
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
    };
}
