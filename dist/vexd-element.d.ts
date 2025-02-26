/**
 * @file vexd-element.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */
export declare class VexdElement {
    private el;
    private static animationsInjected;
    /**
     * creates an instance of VexdElement.
     * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
     * @throws Will throw an error if the element is not found.
     */
    constructor(element: HTMLElement | string);
    /**
     * returns a new VexdElement instance wrapping the first descendant matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexdElement} A new VexdElement instance.
     * @throws Will throw an error if no element is found.
     */
    select(selector: string): VexdElement;
    /**
     * Gets the element's id.
     * @overload
     * @returns {string} The element's id.
     */
    id(): string;
    /**
     * Selects an element by id.
     * @param elementId {string}
     * @returns {VexdElement} A new VexdElement instance.
     */
    id(elementId: string): VexdElement;
    /**
     * Returns an array of VexdElement instances for all descendants matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    all(selector: string): VexdElement[];
    /**
     * Iterates over each descendant matching the selector, invoking the callback.
     * @param {string} selector - CSS selector to search for.
     * @param {(VexdElement: VexdElement, index: number) => void} callback - Function to call for each element.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    each(selector: string, callback: (VexdElement: VexdElement, index: number) => void): VexdElement[];
    /**
     * gets or sets the inner HTML.
     * @overload
     * @returns {string} The element's inner HTML.
     */
    html(): string;
    /**
     * sets the inner HTML and returns the instance.
     * @param {string} content - HTML content.
     * @returns {VexdElement} The current VexdElement instance.
     */
    html(content: string): VexdElement;
    /**
     * gets or sets the text content.
     * @overload
     * @returns {string} The element's text content.
     */
    text(): string;
    /**
     * sets the text content and returns the instance.
     * @param {string} content - Text content.
     * @returns {VexdElement} The current VexdElement instance.
     */
    text(content: string): VexdElement;
    /**
     * adds an event listener and returns a cleanup function to remove it.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {() => void} Function to remove the event listener.
     */
    event(eventName: string, callback: (e: Event) => void): () => void;
    /**
     * adds an event listener that is automatically removed after one invocation.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {VexdElement} The current VexdElement instance.
     */
    once(eventName: string, callback: (e: Event) => void): VexdElement;
    /**
     * Dispatches a custom event.
     * @param {string} eventName - Custom event name.
     * @param {{ [key: string]: any }} [details={}] - Event details.
     * @returns {VexdElement} The current VexdElement instance.
     */
    emit(eventName: string, details?: {
        [key: string]: any;
    }): VexdElement;
    /**
     * Adds a class to the element.
     * @param {string} className - Class name to add.
     * @returns {VexdElement} The current VexdElement instance.
     */
    classed(className: string): VexdElement;
    /**
     * Removes a class from the element.
     * @param {string} className - Class name to remove.
     * @returns {VexdElement} The current VexdElement instance.
     */
    declass(className: string): VexdElement;
    /**
     * Toggles a class on the element.
     * @param {string} className - Class name to toggle.
     * @returns {VexdElement} The current VexdElement instance.
     */
    toggleClass(className: string): VexdElement;
    /**
     * checks if the element has a specific class.
     * @param {string} className - Class name to check.
     * @returns {boolean} True if the element has the class.
     */
    hasClass(className: string): boolean;
    /**
     * Gets or sets an attribute.
     * @overload
     * @param {string} attribute - Attribute name.
     * @returns {string} The attribute's value.
     */
    attr(attribute: string): string;
    /**
     * Sets an attribute and returns the instance.
     * @param {string} attribute - Attribute name.
     * @param {string} value - Attribute value.
     * @returns {VexdElement} The current VexdElement instance.
     */
    attr(attribute: string, value: string): VexdElement;
    /**
     * checks if the element has a specific attribute.
     * @param {string} attribute - Attribute name.
     * @returns {boolean} True if the attribute exists.
     */
    hasAttr(attribute: string): boolean;
    /**
     * gets or sets a data attribute.
     * @overload
     * @param {string} attribute - Data attribute name.
     * @returns {string} The data attribute's value.
     */
    data(attribute: string): string;
    /**
     * sets a data attribute and returns the instance.
     * @param {string} attribute - Data attribute name.
     * @param {string} value - Data attribute value.
     * @returns {VexdElement} The current VexdElement instance.
     */
    data(attribute: string, value: string): VexdElement;
    /**
     * gets or sets an inline style property.
     * @overload
     * @param {string} property - CSS property name.
     * @returns {string} The property's value.
     */
    style(property: string): string;
    /**
     * Sets a style property and returns the instance.
     * @param {string} property - CSS property name.
     * @param {string} value - CSS property value.
     * @returns {VexdElement} The current VexdElement instance.
     */
    style(property: string, value: string): VexdElement;
    /**
     * gets or sets a native property.
     * @overload
     * @template T
     * @param {keyof T} propertyName - The property name.
     * @returns {T[keyof T]} The property's value.
     */
    prop<T>(propertyName: keyof T): T[keyof T];
    /**
     * sets a native property and returns the instance.
     * @template T
     * @param {keyof T} propertyName - The property name.
     * @param {T[keyof T]} value - The new value.
     * @returns {VexdElement} The current VexdElement instance.
     */
    prop<T>(propertyName: keyof T, value: T[keyof T]): VexdElement;
    /**
     * Filters descendant elements matching the selector and predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexdElement: VexdElement) => boolean} predicate - Predicate function.
     * @returns {VexdElement[]} Array of VexdElement instances that match the predicate.
     */
    where(selector: string, predicate: (VexdElement: VexdElement) => boolean): VexdElement[];
    /**
     * filters descendant elements matching the selector that do NOT satisfy the predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexdElement: VexdElement) => boolean} predicate - Predicate function.
     * @returns {VexdElement[]} Array of VexdElement instances that do not match the predicate.
     */
    excluding(selector: string, predicate: (vexEl: VexdElement) => boolean): VexdElement[];
    /**
     * returns the closest ancestor (or self) that matches the selector.
     * @param {string} selector - CSS selector.
     * @returns {VexdElement | null} Closest matching VexdElement instance or null.
     */
    closest(selector: string): VexdElement | null;
    /**
     * returns the parent element as a VexdElement instance.
     * @returns {VexdElement | null} The parent VexdElement instance or null.
     */
    parent(): VexdElement | null;
    /**
     * returns an array of children as VexdElement instances.
     * @returns {VexdElement[]} Array of child VexdElement instances.
     */
    children(): VexdElement[];
    /**
     * returns the underlying native HTMLElement.
     * @returns {HTMLElement} The native DOM element.
     */
    native(): HTMLElement;
    /**
     * Observes attribute changes on the element.
     * @param {string} attribute - Attribute name to observe.
     * @param {(oldValue: string | null, newValue: string | null) => void} callback - Callback when attribute changes.
     * @returns {() => void} Function to disconnect the observer.
     */
    observe(attribute: string, callback: (oldValue: string | null, newValue: string | null) => void): () => void;
    /**
     * uses IntersectionObserver to observe when the element enters or leaves the viewport.
     * @param {(entry: IntersectionObserverEntry) => void} onScreen - Callback when element is in view.
     * @param {(entry: IntersectionObserverEntry) => void} offScreen - Callback when element is out of view.
     * @param {IntersectionObserverInit} [options] - IntersectionObserver options.
     * @returns {() => void} Function to disconnect the observer.
     */
    intersection(onScreen: (entry: IntersectionObserverEntry) => void, offScreen: (entry: IntersectionObserverEntry) => void, options?: IntersectionObserverInit): () => void;
    /**
     * Adds a class to the element for a specified time (ms) or until a promise resolves.
     * @param {string} className - Class name to add.
     * @param {number | Promise<any>} duration - Duration in ms or a promise.
     * @returns {VexdElement} The current VexdElement instance.
     */
    timedClass(className: string, duration: number | Promise<any>): VexdElement;
    /**
     * injects animation CSS if not already injected.
     * @private
     */
    private static ensureAnimationsInjected;
    /**
     * helper that applies an animation class with a given duration.
     * @private
     * @param {string} animationClass - CSS class for the animation.
     * @param {number} duration - Duration of the animation in ms.
     * @param {() => void} [onComplete] - Optional callback after animation.
     * @returns {VexdElement} The current VexdElement instance.
     */
    private animateClass;
    /**
     * fades in the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    fadeIn(duration: number, onComplete?: () => void): VexdElement;
    /**
     * fades out the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    fadeOut(duration: number, onComplete?: () => void): VexdElement;
    /**
     * Slides the element in from the left.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    slideRight(duration: number, onComplete?: () => void): VexdElement;
    /**
     * Slightly moves the element to the left.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    slightLeft(duration: number, onComplete?: () => void): VexdElement;
    /**
     * Slightly moves the element down.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    slightDown(duration: number, onComplete?: () => void): VexdElement;
    /**
     * Slides the element up.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    slideUp(duration: number, onComplete?: () => void): VexdElement;
    /**
     * rotates the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    spins(duration: number, onComplete?: () => void): VexdElement;
    /**
     * Bounces the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    bounces(duration: number, onComplete?: () => void): VexdElement;
    /**
     * Blinks the element's text.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexdElement} The current VexdElement instance.
     */
    blinkText(duration: number, onComplete?: () => void): VexdElement;
}
