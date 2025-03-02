/**
 * @file vexd-element.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */
class VexdElement {
    /**
     * creates an instance of VexdElement.
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
     * returns a new VexdElement instance wrapping the first descendant matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexdElement} A new VexdElement instance.
     * @throws Will throw an error if no element is found.
     */
    select(selector) {
        const found = this.el.querySelector(selector);
        if (!found) {
            throw new Error(`VexJS: element not found for selector: ${selector}`);
        }
        return new VexdElement(found);
    }
    /**
     * returns a new VexdElement instance wrapping the first descendant matching the class name.
     * @param className
     * @returns
     */
    classed(className) {
        return this.select(`.${className}`);
    }
    /**
     * gets all descendants matching the class name.
     * @param className
     * @returns {VexdElement[]}
     */
    classes(className) {
        return this.all(`.${className}`);
    }
    /**
     * returns a new VexdElement instance wrapping the first descendant matching the id.
     * @param elementId
     * @returns {VexdElement}
     */
    id(elementId) {
        return this.select(`#${elementId}`);
    }
    /**
     * Returns an array of VexdElement instances for all descendants matching the selector.
     * @param {string} selector - CSS selector to search for.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    all(selector) {
        const nodeList = this.el.querySelectorAll(selector);
        return Array.from(nodeList).map((el) => new VexdElement(el));
    }
    /**
     * Iterates over each descendant matching the selector, invoking the callback.
     * @param {string} selector - CSS selector to search for.
     * @param {(VexdElement: VexdElement, index: number) => void} callback - Function to call for each element.
     */
    each(selector, callback) {
        this.all(selector).forEach((VexdElement, index) => callback(VexdElement, index));
    }
    html(content) {
        if (!content) {
            return this.el.innerHTML;
        }
        this.el.innerHTML = content;
        return this;
    }
    text(content) {
        if (!content) {
            return this.el.textContent || "";
        }
        this.el.textContent = content;
        return this;
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
     * @returns {VexdElement} The current VexdElement instance.
     */
    once(eventName, callback) {
        this.el.addEventListener(eventName, callback, { once: true });
        return this;
    }
    /**
     * Dispatches a custom event.
     * @param {string} eventName - Custom event name.
     * @param {{ [key: string]: any }} [details={}] - Event details.
     * @returns {VexdElement} The current VexdElement instance.
     */
    emit(eventName, details = {}) {
        const event = new CustomEvent(eventName, { detail: details });
        this.el.dispatchEvent(event);
        return this;
    }
    /**
     * Adds a class to the element.
     * @param {string} className - Class name to add.
     * @returns {VexdElement} The current VexdElement instance.
     */
    addClass(className) {
        this.el.classList.add(className);
        return this;
    }
    /**
     * Removes a class from the element.
     * @param {string} className - Class name to remove.
     * @returns {VexdElement} The current VexdElement instance.
     */
    removeClass(className) {
        this.el.classList.remove(className);
        return this;
    }
    /**
     * Toggles a class on the element.
     * @param {string} className - Class name to toggle.
     * @returns {VexdElement} The current VexdElement instance.
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
     * @param {(VexdElement: VexdElement) => boolean} predicate - Predicate function.
     * @returns {VexdElement[]} Array of VexdElement instances that match the predicate.
     */
    where(selector, predicate) {
        return this.all(selector).filter((VexdElement) => predicate(VexdElement));
    }
    /**
     * filters descendant elements matching the selector that do NOT satisfy the predicate.
     * @param {string} selector - CSS selector.
     * @param {(VexdElement: VexdElement) => boolean} predicate - Predicate function.
     * @returns {VexdElement[]} Array of VexdElement instances that do not match the predicate.
     */
    excluding(selector, predicate) {
        return this.all(selector).filter((vEl) => !predicate(vEl));
    }
    /**
     * returns the closest ancestor (or self) that matches the selector.
     * @param {string} selector - CSS selector.
     * @returns {VexdElement | null} Closest matching VexdElement instance or null.
     */
    closest(selector) {
        const found = this.el.closest(selector);
        return found ? new VexdElement(found) : null;
    }
    /**
     * returns the parent element as a VexdElement instance.
     * @returns {VexdElement | null} The parent VexdElement instance or null.
     */
    parent() {
        return this.el.parentElement
            ? new VexdElement(this.el.parentElement)
            : null;
    }
    /**
     * returns an array of children as VexdElement instances.
     * @returns {VexdElement[]} Array of child VexdElement instances.
     */
    children() {
        return Array.from(this.el.children).map((child) => new VexdElement(child));
    }
    /**
     * returns the underlying native HTMLElement.
     * @returns {HTMLElement} The native DOM element.
     */
    native() {
        return this.el;
    }
    /**
     * uses the MutationObserver API to observe changes to a specific attribute.
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
     * @returns {VexdElement} The current VexdElement instance.
     */
    timedClass(className, duration) {
        this.addClass(className);
        if (typeof duration === "number") {
            setTimeout(() => {
                this.removeClass(className);
            }, duration);
        }
        else if (duration && typeof duration.then === "function") {
            duration.then(() => this.removeClass(className));
        }
        return this;
    }
    /**
     * equivalent to .appendChild
     * @param el
     * @returns {VexdElement}
     */
    add(el) {
        if (typeof el === "string") {
            this.el.insertAdjacentHTML("beforeend", el);
            return this;
        }
        if (el instanceof VexdElement) {
            this.el.appendChild(el.native());
            return this;
        }
        this.el.appendChild(el);
        return this;
    }
    /**
     * equivalent to .innerHTML = ""
     * @returns VexdElement
     */
    empty() {
        this.el.innerHTML = "";
        return this;
    }
    /**
     * adds the CSS declaration to the element's style.
     * @param cssDeclaration
     * @returns
     */
    css(cssDeclaration) {
        Object.assign(this.el.style, cssDeclaration);
        return this;
    }
    /**
     * defines a mouseenter and mouseleave event.
     * @param mouseEnter
     * @param mouseLeave
     * @returns {() => void} function to remove the event listeners.
     */
    onHover(mouseEnter, mouseLeave) {
        this.el.addEventListener("mouseenter", mouseEnter);
        this.el.addEventListener("mouseleave", mouseLeave);
        return () => {
            this.el.removeEventListener("mouseenter", mouseEnter);
            this.el.removeEventListener("mouseleave", mouseLeave);
        };
    }
    /*
     * equivalent to addEventListener("click", callback) or el.click()
     * @param callback
     * @returns {() => void} function to remove the event listener.
     */
    onClick(callback) {
        this.el.addEventListener("click", callback);
        return () => this.el.removeEventListener("click", callback);
    }
    /**
     * equivalent to addEventListener("change", callback)
     * @param callback
     * @returns {() => void} function to remove the event listener.
     */
    onChange(callback) {
        this.el.addEventListener("change", callback);
        return () => this.el.removeEventListener("change", callback);
    }
    value(value) {
        if (value === undefined) {
            return this.el.value;
        }
        this.el.value = value;
        return this;
    }
    /**
     * sets the element's disabled property.
     * @param predicate
     * @returns {VexdElement}
     */
    disable(predicate) {
        this.prop("disabled", !!predicate);
        return this;
    }
    /**
     * sets the element's aria attribute.
     * (e.g aria("label", "my label")) -> aria-label="my label"
     * @param attribute
     * @param value
     * @returns {VexdElement}
     */
    aria(attribute, value) {
        if (value === undefined) {
            return this.el.getAttribute(`aria-${attribute}`) || "";
        }
        this.el.setAttribute(`aria-${attribute}`, value);
        return this;
    }
    /**
     * returns the element's position and size.
     * @returns {DOMRect}
     */
    position() {
        return this.el.getBoundingClientRect();
    }
    /**
     * returns the element's offset position.
     * @returns {top: number, left: number}
     */
    offset() {
        const { top, left } = this.el.getBoundingClientRect();
        return { top, left };
    }
    remove(selector) {
        if (!selector) {
            this.el.remove();
            return;
        }
        this.all(selector).forEach((el) => el.remove());
    }
}

/**
 * @file vex-doc.ts
 * @description Document-level utilities for working with VexdElement.
 */
class Vexd {
    /**
     * equivalent to document.querySelector, but returns a VexdElement instance.
     * @param {string} selector - CSS selector.
     * @returns {VexdElement} A VexdElement instance wrapping the selected element.
     * @throws Will throw an error if no element is found.
     */
    static select(selector) {
        const el = document.querySelector(selector);
        if (!el)
            throw new Error(`Element not found for selector: ${selector}`);
        return new VexdElement(el);
    }
    /**
     * returns a VexdElement instance, equivalent to document.getElementById.
     * @param {string} id - The element's id.
     * @returns {VexdElement} a VexdElement instance.
     * @throws will throw an error if no element is found.
     */
    static id(id) {
        const el = document.getElementById(id);
        if (!el)
            throw new Error(`vexd-js: Element not found with id: ${id}`);
        return new VexdElement(el);
    }
    /**
     * equivalent to document.querySelectorAll, but returns an array of VexdElement instances.
     * @param {string} selector - CSS selector.
     * @param {(vex: VexdElement, index: number) => void} callback - Callback for each element.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    static each(selector, callback) {
        const nodeList = document.querySelectorAll(selector);
        Array.from(nodeList).forEach((el, index) => {
            const vex = new VexdElement(el);
            callback(vex, index);
        });
    }
    /**
     * querySelectorAll but returns an array of VexdElement instances.
     * @param selector
     * @returns
     */
    static all(selector) {
        const nodeList = document.querySelectorAll(selector);
        return Array.from(nodeList).map((el) => new VexdElement(el));
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
     * sets the document title.
     * @param {string} title - New title.
     */
    static title(title) {
        document.title = title;
    }
    /**
     * creates a new element in the document, returned as a vex element.
     * @param {string} elementName - The tag name for the element.
     * @returns {VexdElement} A VexdElement instance wrapping the new element.
     */
    static create(elementName, options) {
        const el = document.createElement(elementName, options);
        return new VexdElement(el);
    }
    /**
     * gets all of the forms in the document with an optional selector to filter them
     * by
     * @param {string} [optionalSelector] - Optional CSS selector to filter forms.
     * @returns {VexdElement[]} Array of VexdElement instances wrapping form elements.
     */
    static forms(optionalSelector) {
        let forms;
        if (optionalSelector) {
            forms = document.querySelectorAll(`form${optionalSelector}`);
        }
        else {
            forms = document.getElementsByTagName("form");
        }
        return Array.from(forms).map((el) => new VexdElement(el));
    }
    /**
     * equivalent to document.getElementsByTagName
     * @param {string} tagName - The tag name.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    static tags(tagName) {
        const tags = document.getElementsByTagName(tagName);
        return Array.from(tags).map((el) => new VexdElement(el));
    }
    /**
     * equivalent to document.getElementsByClassName
     * @param {string} className - The class name.
     * @returns {VexdElement[]} Array of VexdElement instances.
     */
    static className(className) {
        const elements = document.getElementsByClassName(className);
        return Array.from(elements).map((el) => new VexdElement(el));
    }
    /**
     * creates a VexdElement from a template literal and returns the
     * "top-level" element or container, if there are multiple only the
     * first one is returned as to ensure your templates are short as this
     * shouldn't be used for massive templates
     */
    static template(strings, ...values) {
        const rawHTML = strings.reduce((result, string, i) => {
            var _a;
            const value = i < values.length ? String((_a = values[i]) !== null && _a !== void 0 ? _a : "") : "";
            return result + string + value;
        }, "");
        const template = document.createElement("template");
        template.innerHTML = rawHTML.trim();
        const content = template.content;
        return new VexdElement(content.firstChild);
    }
    static on(event, callback) {
        document.addEventListener(event, callback);
        return () => document.removeEventListener(event, callback);
    }
}

/**
 * Core reactive state management class
 */
class VexdState {
    constructor(initialValue) {
        this.subscribers = [];
        this.value = initialValue;
    }
    get state() {
        return this.value;
    }
    /**
     * Update state with a new value or using a function that receives the previous state
     * @param newState New value or function to transform the current state
     */
    setState(newState) {
        const previousValue = this.value;
        if (typeof newState === "function") {
            this.value = newState(previousValue);
        }
        else {
            this.value = newState;
        }
        if (this.value !== previousValue) {
            this.subscribers.forEach((subscriber) => subscriber(this.value));
        }
    }
    /**
     * Register a side effect function that runs on state changes
     * @param fn Function to execute when state changes
     * @param triggerNow Whether to execute the function immediately
     * @returns Unsubscribe function
     */
    sideEffect(fn, triggerNow = false) {
        if (triggerNow) {
            fn(this.value);
        }
        this.subscribers.push(fn);
        return () => {
            const index = this.subscribers.indexOf(fn);
            if (index !== -1)
                this.subscribers.splice(index, 1);
        };
    }
    /**
     * Remove all subscribers
     */
    clear() {
        this.subscribers = [];
    }
}
/**
 * extended state management class for arrays with helper methods
 */
class VexdStateList extends VexdState {
    /**
     * add an item to the list
     * @param item Item to add
     */
    add(item) {
        this.setState((oldState) => [...oldState, item]);
    }
    /**
     * Remove items that match the predicate
     * @param predicate Function that returns true for items to keep
     */
    remove(predicate) {
        this.setState((oldState) => oldState.filter((item) => !predicate(item)));
    }
    /**
     * Transform each item in the list
     * @param callback Mapping function
     */
    map(callback) {
        this.setState((oldState) => oldState.map(callback));
    }
    /**
     * Find an item in the list
     * @param predicate Function that returns true when the desired item is found
     * @returns The found item or undefined
     */
    find(predicate) {
        return this.state.find(predicate);
    }
    /**
     * Filter the list without modifying the original
     * @param predicate Function that returns true for items to include
     * @returns A new filtered array
     */
    filter(predicate) {
        return this.state.filter(predicate);
    }
}

/**
 * Creates a managed interval that can be started, stopped, and reset
 * @param timerFn Function to execute on each interval
 * @param ms Millisecond interval (defaults to 1000ms)
 * @returns Controlled interval hook
 */
function createInterval(timerFn, ms = 1000) {
    let intervalId = null;
    const start = () => {
        if (intervalId)
            stop();
        intervalId = setInterval(timerFn, ms);
    };
    const stop = () => {
        if (!intervalId)
            return;
        clearInterval(intervalId);
        intervalId = null;
    };
    const reset = () => {
        stop();
        start();
    };
    return { start, stop, reset };
}
/**
 * Creates a managed timeout that can be started, stopped, and reset
 * @param timerFn Function to execute after the timeout
 * @param ms Millisecond delay (defaults to 1000ms)
 * @returns Controlled timeout hook
 */
function createTimer(timerFn, ms = 1000) {
    let timeoutId = null;
    const start = () => {
        if (timeoutId)
            stop();
        timeoutId = setTimeout(timerFn, ms);
    };
    const stop = () => {
        if (!timeoutId)
            return;
        clearTimeout(timeoutId);
        timeoutId = null;
    };
    const reset = () => {
        stop();
        start();
    };
    return { start, stop, reset };
}
/**
 * Creates a store for tracking and disposing of effects
 * @returns A tuple containing an addEffect function and a dispose function
 */
function effectStore() {
    const effects = [];
    const addEffect = (effect) => {
        effects.push(effect);
        return () => {
            const index = effects.indexOf(effect);
            if (index !== -1)
                effects.splice(index, 1);
        };
    };
    const dispose = () => {
        effects.forEach((disposeFn) => {
            if (disposeFn)
                disposeFn();
        });
    };
    return [addEffect, dispose];
}
/**
 * create a reactive state container
 * @param initialValue Initial state value
 * @returns A VexdState instance
 */
function state(initialValue) {
    return new VexdState(initialValue);
}
/**
 * create a reactive state container for an array
 * @param initialValue Initial array value
 * @returns A VexdStateList instance
 */
function stateList(initialValue = []) {
    return new VexdStateList(initialValue);
}

export { Vexd, VexdElement, VexdState, VexdStateList, createInterval, createTimer, effectStore, state, stateList };
//# sourceMappingURL=index.esm.js.map
