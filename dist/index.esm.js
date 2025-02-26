/**
 * @file VexElement.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */
class VexElement {
    /**
     * creates an instance of VexElement.
     * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
     * @throws Will throw an error if the element is not found.
     */
    constructor(element) {
        if (typeof element === "string") {
            const found = document.querySelector(element);
            if (!found) {
                throw new Error(`VexJS: Element not found for selector: ${element}`);
            }
            this.el = found;
        }
        else {
            this.el = element;
        }
    }
    /**
     * returns a new VexElement instance wrapping the first descendant matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexElement} A new VexElement instance.
     * @throws Will throw an error if no element is found.
     */
    select(selector) {
        const found = this.el.querySelector(selector);
        if (!found) {
            throw new Error(`VexJS: element not found for selector: ${selector}`);
        }
        return new VexElement(found);
    }
    id(elementId) {
        if (elementId === undefined) {
            return this.el.id;
        }
        return this.select(`#${elementId}`);
    }
    /**
     * Returns an array of VexElement instances for all descendants matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    all(selector) {
        const nodeList = this.el.querySelectorAll(selector);
        return Array.from(nodeList).map((el) => new VexElement(el));
    }
    /**
     * Iterates over each descendant matching the selector, invoking the callback.
     * @param {string} selector - CSS selector to search for.
     * @param {(VexElement: VexElement, index: number) => void} callback - Function to call for each element.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    each(selector, callback) {
        const elements = this.all(selector);
        elements.forEach((VexElement, index) => callback(VexElement, index));
        return elements;
    }
    html(content) {
        if (content === undefined) {
            return this.el.innerHTML;
        }
        else {
            this.el.innerHTML = content;
            return this;
        }
    }
    text(content) {
        if (content === undefined) {
            return this.el.textContent || "";
        }
        else {
            this.el.textContent = content;
            return this;
        }
    }
    /**
     * adds an event listener and returns a cleanup function to remove it.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {() => void} Function to remove the event listener.
     */
    event(eventName, callback) {
        this.el.addEventListener(eventName, callback);
        return () => {
            this.el.removeEventListener(eventName, callback);
        };
    }
    /**
     * adds an event listener that is automatically removed after one invocation.
     * @param {string} eventName - Event name.
     * @param {(e: Event) => void} callback - Callback function.
     * @returns {VexElement} The current VexElement instance.
     */
    once(eventName, callback) {
        this.el.addEventListener(eventName, callback, { once: true });
        return this;
    }
    /**
     * Dispatches a custom event.
     * @param {string} eventName - Custom event name.
     * @param {{ [key: string]: any }} [details={}] - Event details.
     * @returns {VexElement} The current VexElement instance.
     */
    emit(eventName, details = {}) {
        const event = new CustomEvent(eventName, { detail: details });
        this.el.dispatchEvent(event);
        return this;
    }
    // ---------------------
    // element class methods
    // ---------------------
    /**
     * Adds a class to the element.
     * @param {string} className - Class name to add.
     * @returns {VexElement} The current VexElement instance.
     */
    classed(className) {
        this.el.classList.add(className);
        return this;
    }
    /**
     * Removes a class from the element.
     * @param {string} className - Class name to remove.
     * @returns {VexElement} The current VexElement instance.
     */
    declass(className) {
        this.el.classList.remove(className);
        return this;
    }
    /**
     * Toggles a class on the element.
     * @param {string} className - Class name to toggle.
     * @returns {VexElement} The current VexElement instance.
     */
    toggleClass(className) {
        this.el.classList.toggle(className);
        return this;
    }
    /**
     * checks if the element has a specific class.
     * @param {string} className - Class name to check.
     * @returns {boolean} True if the element has the class.
     */
    hasClass(className) {
        return this.el.classList.contains(className);
    }
    attr(attribute, value) {
        if (value === undefined) {
            return this.el.getAttribute(attribute) || "";
        }
        else {
            this.el.setAttribute(attribute, value);
            return this;
        }
    }
    /**
     * checks if the element has a specific attribute.
     * @param {string} attribute - Attribute name.
     * @returns {boolean} True if the attribute exists.
     */
    hasAttr(attribute) {
        return this.el.hasAttribute(attribute);
    }
    data(attribute, value) {
        if (value === undefined) {
            return this.el.dataset[attribute] || "";
        }
        else {
            this.el.dataset[attribute] = value;
            return this;
        }
    }
    style(property, value) {
        if (value === undefined) {
            return this.el.style.getPropertyValue(property);
        }
        else {
            this.el.style.setProperty(property, value);
            return this;
        }
    }
    prop(propertyName, value) {
        if (value === undefined) {
            return this.el[propertyName];
        }
        else {
            this.el[propertyName] = value;
            return this;
        }
    }
    /**
     * Filters descendant elements matching the selector and predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexElement: VexElement) => boolean} predicate - Predicate function.
     * @returns {VexElement[]} Array of VexElement instances that match the predicate.
     */
    where(selector, predicate) {
        return this.all(selector).filter((VexElement) => predicate(VexElement));
    }
    /**
     * filters descendant elements matching the selector that do NOT satisfy the predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexElement: VexElement) => boolean} predicate - Predicate function.
     * @returns {VexElement[]} Array of VexElement instances that do not match the predicate.
     */
    excluding(selector, predicate) {
        return this.all(selector).filter((vEl) => !predicate(vEl));
    }
    /**
     * returns the closest ancestor (or self) that matches the selector.
     * @param {string} selector - CSS selector.
     * @returns {VexElement | null} Closest matching VexElement instance or null.
     */
    closest(selector) {
        const found = this.el.closest(selector);
        return found ? new VexElement(found) : null;
    }
    /**
     * returns the parent element as a VexElement instance.
     * @returns {VexElement | null} The parent VexElement instance or null.
     */
    parent() {
        return this.el.parentElement ? new VexElement(this.el.parentElement) : null;
    }
    /**
     * returns an array of children as VexElement instances.
     * @returns {VexElement[]} Array of child VexElement instances.
     */
    children() {
        return Array.from(this.el.children).map((child) => new VexElement(child));
    }
    /**
     * returns the underlying native HTMLElement.
     * @returns {HTMLElement} The native DOM element.
     */
    native() {
        return this.el;
    }
    /**
     * Observes attribute changes on the element.
     * @param {string} attribute - Attribute name to observe.
     * @param {(oldValue: string | null, newValue: string | null) => void} callback - Callback when attribute changes.
     * @returns {() => void} Function to disconnect the observer.
     */
    observe(attribute, callback) {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === "attributes" &&
                    mutation.attributeName === attribute) {
                    const oldVal = mutation.oldValue;
                    const newVal = this.el.getAttribute(attribute);
                    callback(oldVal, newVal);
                }
            }
        });
        observer.observe(this.el, {
            attributes: true,
            attributeFilter: [attribute],
            attributeOldValue: true,
        });
        return () => observer.disconnect();
    }
    /**
     * uses IntersectionObserver to observe when the element enters or leaves the viewport.
     * @param {(entry: IntersectionObserverEntry) => void} onScreen - Callback when element is in view.
     * @param {(entry: IntersectionObserverEntry) => void} offScreen - Callback when element is out of view.
     * @param {IntersectionObserverInit} [options] - IntersectionObserver options.
     * @returns {() => void} Function to disconnect the observer.
     */
    intersection(onScreen, offScreen, options) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                entry.isIntersecting ? onScreen(entry) : offScreen(entry);
            });
        }, options);
        observer.observe(this.el);
        return () => observer.disconnect();
    }
    /**
     * Adds a class to the element for a specified time (ms) or until a promise resolves.
     * @param {string} className - Class name to add.
     * @param {number | Promise<any>} duration - Duration in ms or a promise.
     * @returns {VexElement} The current VexElement instance.
     */
    timedClass(className, duration) {
        this.classed(className);
        if (typeof duration === "number") {
            setTimeout(() => {
                this.declass(className);
            }, duration);
        }
        else if (duration && typeof duration.then === "function") {
            duration.then(() => this.declass(className));
        }
        return this;
    }
    /**
     * injects animation CSS if not already injected.
     * @private
     */
    static ensureAnimationsInjected() {
        if (VexElement.animationsInjected)
            return;
        VexElement.animationsInjected = true;
    }
    /**
     * helper that applies an animation class with a given duration.
     * @private
     * @param {string} animationClass - CSS class for the animation.
     * @param {number} duration - Duration of the animation in ms.
     * @param {() => void} [onComplete] - Optional callback after animation.
     * @returns {VexElement} The current VexElement instance.
     */
    animateClass(animationClass, duration, onComplete) {
        VexElement.ensureAnimationsInjected();
        this.el.style.setProperty("--vex-duration", `${duration}ms`);
        this.classed(animationClass);
        setTimeout(() => {
            this.declass(animationClass);
            if (onComplete)
                onComplete();
        }, duration);
        return this;
    }
    /**
     * fades in the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    fadeIn(duration, onComplete) {
        return this.animateClass("vex-anim-fade-in", duration, onComplete);
    }
    /**
     * fades out the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    fadeOut(duration, onComplete) {
        return this.animateClass("vex-anim-fade-out", duration, onComplete);
    }
    /**
     * Slides the element in from the left.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slideRight(duration, onComplete) {
        return this.animateClass("vex-anim-slide-right", duration, onComplete);
    }
    /**
     * Slightly moves the element to the left.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slightLeft(duration, onComplete) {
        return this.animateClass("vex-anim-slight-left", duration, onComplete);
    }
    /**
     * Slightly moves the element down.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slightDown(duration, onComplete) {
        return this.animateClass("vex-anim-slight-down", duration, onComplete);
    }
    /**
     * Slides the element up.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    slideUp(duration, onComplete) {
        return this.animateClass("vex-anim-slide-up", duration, onComplete);
    }
    /**
     * rotates the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    spins(duration, onComplete) {
        return this.animateClass("vex-anim-spins", duration, onComplete);
    }
    /**
     * Bounces the element.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    bounces(duration, onComplete) {
        return this.animateClass("vex-anim-bounces", duration, onComplete);
    }
    /**
     * Blinks the element's text.
     * @param {number} duration - Duration in ms.
     * @param {() => void} [onComplete] - Callback after animation completes.
     * @returns {VexElement} The current VexElement instance.
     */
    blinkText(duration, onComplete) {
        return this.animateClass("vex-anim-blink-text", duration, onComplete);
    }
}
VexElement.animationsInjected = false;

/**
 * @file VexDoc.ts
 * @description Document-level utilities for working with VexElement.
 */
class vexd {
    /**
     * equivalent to document.querySelector, but returns a VexElement instance.
     * @param {string} selector - CSS selector.
     * @returns {VexElement} A VexElement instance wrapping the selected element.
     * @throws Will throw an error if no element is found.
     */
    static select(selector) {
        const el = document.querySelector(selector);
        if (!el)
            throw new Error(`Element not found for selector: ${selector}`);
        return new VexElement(el);
    }
    /**
     * returns a VexElement instance, equivalent to document.getElementById.
     * @param {string} id - The element's id.
     * @returns {VexElement} a VexElement instance.
     * @throws will throw an error if no element is found.
     */
    static id(id) {
        const el = document.getElementById(id);
        if (!el)
            throw new Error(`Element not found with id: ${id}`);
        return new VexElement(el);
    }
    /**
     * equivalent to document.querySelectorAll, but returns an array of VexElement instances.
     * @param {string} selector - CSS selector.
     * @param {(vex: VexElement, index: number) => void} callback - Callback for each element.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    static each(selector, callback) {
        const nodeList = document.querySelectorAll(selector);
        Array.from(nodeList).forEach((el, index) => {
            const vex = new VexElement(el);
            callback(vex, index);
        });
    }
    static all(selector) {
        const nodeList = document.querySelectorAll(selector);
        return Array.from(nodeList).map((el) => new VexElement(el));
    }
    /**
     * executes a callback once the DOM is fully loaded.
     * @param {() => void} callback - Callback function.
     */
    static ready(callback) {
        if (document.readyState !== "loading") {
            callback();
        }
        else {
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
    static snippet(template) {
        return (data) => template(data);
    }
    /**
     * sets the document title.
     * @param {string} title - New title.
     */
    static title(title) {
        document.title = title;
    }
    /**
     * imports a CSS file into the document by creating a <link> element.
     * @param {string} cssPath - Path to the CSS file.
     * @returns {VexElement} A VexElement instance wrapping the created <link> element.
     */
    static importCSS(cssPath) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = cssPath;
        document.head.appendChild(link);
        return new VexElement(link);
    }
    /**
     * removes CSS files that include the given file name.
     * @param {string} cssFileName - Partial name of the CSS file.
     * @returns {VexElement[]} Array of VexElement instances for the removed elements.
     */
    static removeCSS(cssFileName) {
        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const removed = [];
        links.forEach((link) => {
            var _a;
            if ((_a = link.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.includes(cssFileName)) {
                link.remove();
                removed.push(new VexElement(link));
            }
        });
        return removed;
    }
    /**
     * creates a new element in the document, returned as a vex element.
     * @param {string} elementName - The tag name for the element.
     * @returns {VexElement} A VexElement instance wrapping the new element.
     */
    static create(elementName) {
        const el = document.createElement(elementName);
        return new VexElement(el);
    }
    /**
     * gets all of the forms in the document with an optional selector to filter them
     * by
     * @param {string} [optionalSelector] - Optional CSS selector to filter forms.
     * @returns {VexElement[]} Array of VexElement instances wrapping form elements.
     */
    static forms(optionalSelector) {
        let forms;
        if (optionalSelector) {
            forms = document.querySelectorAll(`form${optionalSelector}`);
        }
        else {
            forms = document.getElementsByTagName("form");
        }
        return Array.from(forms).map((el) => new VexElement(el));
    }
    /**
     * equivalent to document.getElementsByTagName
     * @param {string} tagName - The tag name.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    static tags(tagName) {
        const tags = document.getElementsByTagName(tagName);
        return Array.from(tags).map((el) => new VexElement(el));
    }
    /**
     * equivalent to document.getElementsByClassName
     * @param {string} className - The class name.
     * @returns {VexElement[]} Array of VexElement instances.
     */
    static classed(className) {
        const elements = document.getElementsByClassName(className);
        return Array.from(elements).map((el) => new VexElement(el));
    }
    /**
     * Provides a reactive signal mechanism.
     * @template T
     * @param {T} initialValue - The initial value.
     * @returns {[ (cb: (oldValue: T, newValue: T) => void) => void, (newValue: T) => void ]}
     * Subscribe and setState functions.
     */
    static signal(initialValue) {
        let state = initialValue;
        const subscribers = [];
        const subscribe = (cb) => {
            subscribers.push(cb);
        };
        const setState = (newValue) => {
            const oldValue = state;
            state = newValue;
            subscribers.forEach((cb) => cb(oldValue, newValue));
        };
        return [subscribe, setState];
    }
}

export { VexElement, vexd };
//# sourceMappingURL=index.esm.js.map
