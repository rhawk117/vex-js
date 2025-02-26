/**
 * @file VexElement.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */
export declare class VexElement {
    private el;
    private static animationsInjected;
    /**
     * creates an instance of VexElement.
     * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
     * @throws Will throw an error if the element is not found.
     */
    constructor(element: HTMLElement | string);
    /**
     * returns a new VexElement instance wrapping the first descendant matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexElement} A new VexElement instance.
     * @throws Will throw an error if no element is found.
     */
    select(selector: string): VexElement;
    /**
     * Gets the element's id.
     * @overload
     * @returns {string} The element's id.
     */
    id(): string;
    /**
     * Selects an element by id.
     * @param elementId {string}
     * @returns {VexElement} A new VexElement instance.
     */
    id(elementId: string): VexElement;
    /**
     * Returns an array of VexElement instances for all descendants matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    all(selector: string): VexElement[];
    /**
     * Iterates over each descendant matching the selector, invoking the callback.
     * @param {string} selector - CSS selector to search for.
     * @param {(VexElement: VexElement, index: number) => void} callback - Function to call for each element.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    each(selector: string, callback: (VexElement: VexElement, index: number) => void): VexElement[];
    /**
     * gets or sets the inner HTML.
     * @overload
     * @returns {string} The element's inner HTML.
     */
    html(): string;
    /**
     * sets the inner HTML and returns the instance.
     * @param {string} content - HTML content.
     * @returns {VexElement} The current VexElement instance.
     */
    html(content: string): VexElement;
    /**
     * gets or sets the text content.
     * @overload
     * @returns {string} The element's text content.
     */
    text(): string;
    /**
     * sets the text content and returns the instance.
     * @param {string} content - Text content.
     * @returns {VexElement} The current VexElement instance.
     */
    text(content: string): VexElement;
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
     * @returns {VexElement} The current VexElement instance.
     */
    once(eventName: string, callback: (e: Event) => void): VexElement;
    /**
     * Dispatches a custom event.
     * @param {string} eventName - Custom event name.
     * @param {{ [key: string]: any }} [details={}] - Event details.
     * @returns {VexElement} The current VexElement instance.
     */
    emit(eventName: string, details?: {
        [key: string]: any;
    }): VexElement;
    /**
     * Adds a class to the element.
     * @param {string} className - Class name to add.
     * @returns {VexElement} The current VexElement instance.
     */
    classed(className: string): VexElement;
    /**
     * Removes a class from the element.
     * @param {string} className - Class name to remove.
     * @returns {VexElement} The current VexElement instance.
     */
    declass(className: string): VexElement;
    /**
     * Toggles a class on the element.
     * @param {string} className - Class name to toggle.
     * @returns {VexElement} The current VexElement instance.
     */
    toggleClass(className: string): VexElement;
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
     * @returns {VexElement} The current VexElement instance.
     */
    attr(attribute: string, value: string): VexElement;
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
     * @returns {VexElement} The current VexElement instance.
     */
    data(attribute: string, value: string): VexElement;
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
     * @returns {VexElement} The current VexElement instance.
     */
    style(property: string, value: string): VexElement;
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
     * @returns {VexElement} The current VexElement instance.
     */
    prop<T>(propertyName: keyof T, value: T[keyof T]): VexElement;
    /**
     * Filters descendant elements matching the selector and predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexElement: VexElement) => boolean} predicate - Predicate function.
     * @returns {VexElement[]} Array of VexElement instances that match the predicate.
     */
    where(selector: string, predicate: (VexElement: VexElement) => boolean): VexElement[];
    /**
     * filters descendant elements matching the selector that do NOT satisfy the predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexElement: VexElement) => boolean} predicate - Predicate function.
     * @returns {VexElement[]} Array of VexElement instances that do not match the predicate.
     */
    excluding(selector: string, predicate: (vexEl: VexElement) => boolean): VexElement[];
    /**
     * returns the closest ancestor (or self) that matches the selector.
     * @param {string} selector - CSS selector.
     * @returns {VexElement | null} Closest matching VexElement instance or null.
     */
    closest(selector: string): VexElement | null;
    /**
     * returns the parent element as a VexElement instance.
     * @returns {VexElement | null} The parent VexElement instance or null.
     */
    parent(): VexElement | null;
    /**
     * returns an array of children as VexElement instances.
     * @returns {VexElement[]} Array of child VexElement instances.
     */
    children(): VexElement[];
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
     * @returns {VexElement} The current VexElement instance.
     */
    timedClass(className: string, duration: number | Promise<any>): VexElement;
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
     * @returns {VexElement} The current VexElement instance.
     */
    private animateClass;
    /**
     * fades in the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    fadeIn(duration: number, onComplete?: () => void): VexElement;
    /**
     * fades out the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    fadeOut(duration: number, onComplete?: () => void): VexElement;
    /**
     * Slides the element in from the left.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slideRight(duration: number, onComplete?: () => void): VexElement;
    /**
     * Slightly moves the element to the left.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slightLeft(duration: number, onComplete?: () => void): VexElement;
    /**
     * Slightly moves the element down.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slightDown(duration: number, onComplete?: () => void): VexElement;
    /**
     * Slides the element up.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slideUp(duration: number, onComplete?: () => void): VexElement;
    /**
     * rotates the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    spins(duration: number, onComplete?: () => void): VexElement;
    /**
     * Bounces the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    bounces(duration: number, onComplete?: () => void): VexElement;
    /**
     * Blinks the element's text.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    blinkText(duration: number, onComplete?: () => void): VexElement;
}
