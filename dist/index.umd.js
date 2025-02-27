(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Vexd = {}));
})(this, (function (exports) { 'use strict';

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
	    id(elementId) {
	        if (elementId === undefined) {
	            return this.el.id;
	        }
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
	     * @returns {VexdElement[]} Array of VexdElement instances.
	     */
	    each(selector, callback) {
	        const elements = this.all(selector);
	        elements.forEach((VexdElement, index) => callback(VexdElement, index));
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
	    // ---------------------
	    // element class methods
	    // ---------------------
	    /**
	     * Adds a class to the element.
	     * @param {string} className - Class name to add.
	     * @returns {VexdElement} The current VexdElement instance.
	     */
	    classed(className) {
	        this.el.classList.add(className);
	        return this;
	    }
	    /**
	     * Removes a class from the element.
	     * @param {string} className - Class name to remove.
	     * @returns {VexdElement} The current VexdElement instance.
	     */
	    declass(className) {
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
	     * equivalent to .appendChild
	     * @param el
	     * @returns
	     */
	    add(el) {
	        if (typeof el === "string") {
	            this.el.insertAdjacentHTML("beforeend", el);
	        }
	        else if (el instanceof VexdElement) {
	            this.el.appendChild(el.native());
	        }
	        else {
	            this.el.appendChild(el);
	        }
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
	    hovered(mouseEnter, mouseLeave) {
	        this.el.addEventListener("mouseenter", mouseEnter);
	        this.el.addEventListener("mouseleave", mouseLeave);
	        return () => {
	            this.el.removeEventListener("mouseenter", mouseEnter);
	            this.el.removeEventListener("mouseleave", mouseLeave);
	        };
	    }
	    /**
	     * equivalent to addEventListener("click", callback) or el.click()
	     * @param callback
	     * @returns {() => void} function to remove the event listener.
	     */
	    clicked(callback) {
	        if (!callback) {
	            this.el.click();
	            return this;
	        }
	        this.el.addEventListener("click", callback);
	        return () => this.el.removeEventListener("click", callback);
	    }
	    /**
	     * equivalent to addEventListener("change", callback)
	     * @param callback
	     * @returns
	     */
	    changed(callback) {
	        this.el.addEventListener("change", callback);
	        return () => this.el.removeEventListener("change", callback);
	    }
	    /**
	     * gets or sets the value of an input element.
	     * @param value
	     * @returns {string | VexdElement}
	     */
	    value(value) {
	        if (value === undefined) {
	            return this.el.value;
	        }
	        this.el.value = value;
	        return this;
	    }
	    /**
	     * binds the value of an input element to a property of an object and
	     * adds a change listener to update the property when the value changes.
	     * @param object
	     * @param property
	     * @returns  {() => void} function to remove the change listener.
	     */
	    bindValue(object, property) {
	        this.value(object[property]);
	        return this.changed(() => (object[property] = this.value()));
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
	     * @returns
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
	}

	/**
	 * @file vex-doc.ts
	 * @description Document-level utilities for working with VexdElement.
	 */
	class vexd {
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
	            throw new Error(`Element not found with id: ${id}`);
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
	     * imports a CSS file into the document by creating a <link> element.
	     * @param {string} cssPath - Path to the CSS file.
	     * @returns {VexdElement} A VexdElement instance wrapping the created <link> element.
	     */
	    static importCSS(cssPath) {
	        const link = document.createElement("link");
	        link.rel = "stylesheet";
	        link.href = cssPath;
	        document.head.appendChild(link);
	        return new VexdElement(link);
	    }
	    /**
	     * removes CSS files that include the given file name.
	     * @param {string} cssFileName - Partial name of the CSS file.
	     * @returns {VexdElement[]} Array of VexdElement instances for the removed elements.
	     */
	    static removeCSS(cssFileName) {
	        const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
	        const removed = [];
	        links.forEach((link) => {
	            var _a;
	            if ((_a = link.getAttribute("href")) === null || _a === void 0 ? void 0 : _a.includes(cssFileName)) {
	                link.remove();
	                removed.push(new VexdElement(link));
	            }
	        });
	        return removed;
	    }
	    /**
	     * creates a new element in the document, returned as a vex element.
	     * @param {string} elementName - The tag name for the element.
	     * @returns {VexdElement} A VexdElement instance wrapping the new element.
	     */
	    static create(elementName) {
	        const el = document.createElement(elementName);
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
	    static state(initialState) {
	        let _state = initialState;
	        let _sideEffects = [];
	        const state = (newState) => {
	            if (!newState) {
	                return _state;
	            }
	            if (typeof newState === "function") {
	                const result = newState(_state);
	                if (result !== undefined) {
	                    _state = result;
	                }
	            }
	            else {
	                _state = newState;
	            }
	            _sideEffects.forEach((fn) => fn(_state));
	            return _state;
	        };
	        const effect = (fn) => {
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
	    static timer(timerFn, ms = 1000) {
	        let interval = null;
	        const start = () => {
	            if (interval) {
	                stop();
	            }
	            interval = setTimeout(timerFn, ms);
	        };
	        const stop = () => {
	            if (!interval)
	                return;
	            clearInterval(interval);
	            interval = null;
	        };
	        const reset = () => {
	            stop();
	            start();
	        };
	        return { start, stop, reset };
	    }
	    static interval(timerFn, ms = 1000) {
	        let interval = null;
	        const start = () => {
	            if (interval) {
	                stop();
	            }
	            interval = setInterval(timerFn, ms);
	        };
	        const stop = () => {
	            if (!interval)
	                return;
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

	exports.VexdElement = VexdElement;
	exports.vexd = vexd;

}));
//# sourceMappingURL=index.umd.js.map
