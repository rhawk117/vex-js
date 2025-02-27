/**
 * @file vex-doc.ts
 * @description Document-level utilities for working with VexdElement.
 */
import { VexdElement } from "./vexd-element";
import { VexdState, VexdTimer, VexdInterval, EffectStore, VexdSignal } from "./vexd-hooks";
export declare class Vexd {
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
     * sets the document title.
     * @param {string} title - New title.
     */
    static title(title: string): void;
    /**
     * creates a new element in the document, returned as a vex element.
     * @param {string} elementName - The tag name for the element.
     * @returns {VexdElement} A VexdElement instance wrapping the new element.
     */
    static create(elementName: string, options?: ElementCreationOptions): VexdElement;
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
     * creates a VexdElement from a template literal and returns the
     * "top-level" element or container, if there are multiple only the
     * first one is returned as to ensure your templates are short as this
     * shouldn't be used for massive templates
     */
    static template(strings: TemplateStringsArray, ...values: any[]): VexdElement;
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
    static state<T>(initialState: T): VexdState<T>;
    /**
     * using the timerFn function, a VexdTimer is created with the
     * start, stop, and reset methods
     * @param timerFn
     * @param ms
     * @returns {VexdTimer}
     */
    static timer(timerFn: () => void, ms?: number): VexdTimer;
    /**
     * Creates a VexdInterval that can be used to run the timerFn parameter
     * every "nth" ms
     * @param timerFn
     * @param ms
     * @returns {VexdInterval}
     */
    static interval(timerFn: () => void, ms?: number): VexdInterval;
    /**
     * creates a basic signal that can be used to trigger updates
     * the signalSetter function is called to get the current value
     * when the signal is emitted and all of the subscribers are
     * called with the new value
     * @param signalSetter
     * @param initialValue
     * @returns
     */
    static signal<T>(signalSetter: () => T, initialValue?: T): VexdSignal<T>;
    static on(event: string, callback: VoidFunction): VoidFunction;
    static effectStore(): EffectStore;
}
