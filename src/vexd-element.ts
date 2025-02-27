/**
 * @file vexd-element.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */

export class VexdElement {
	private el: HTMLElement;

	/**
	 * creates an instance of VexdElement.
	 * @param {HTMLElement | string} element - A DOM element or a CSS selector string.
	 * @throws Will throw an error if the element is not found.
	 */
	constructor(element: HTMLElement | string) {
		if (typeof element === "string") {
			const found = document.querySelector(element);
			if (!found) {
				throw new Error(`VexJS: Element not found for selector: ${element}`);
			}
			this.el = found as HTMLElement;
		} else {
			this.el = element;
		}
	}

	/**
	 * returns a new VexdElement instance wrapping the first descendant matching the selector.
	 * @param {string} selector - CSS selector to search for.
	 * @returns {VexdElement} A new VexdElement instance.
	 * @throws Will throw an error if no element is found.
	 */
	select(selector: string): VexdElement {
		const found = this.el.querySelector(selector);
		if (!found) {
			throw new Error(`VexJS: element not found for selector: ${selector}`);
		}
		return new VexdElement(found as HTMLElement);
	}

	/**
	 * returns a new VexdElement instance wrapping the first descendant matching the class name.
	 * @param className
	 * @returns
	 */
	classed(className: string) {
		return this.select(`.${className}`);
	}

	/**
	 * gets all descendants matching the class name.
	 * @param className
	 * @returns {VexdElement[]}
	 */
	classes(className: string): VexdElement[] {
		return this.all(`.${className}`);
	}

	/**
	 * returns a new VexdElement instance wrapping the first descendant matching the id.
	 * @param elementId
	 * @returns {VexdElement}
	 */
	id(elementId: string): VexdElement {
		return this.select(`#${elementId}`);
	}

	/**
	 * Returns an array of VexdElement instances for all descendants matching the selector.
	 * @param {string} selector - CSS selector to search for.
	 * @returns {VexdElement[]} Array of VexdElement instances.
	 */
	all(selector: string): VexdElement[] {
		const nodeList = this.el.querySelectorAll(selector);
		return Array.from(nodeList).map((el) => new VexdElement(el as HTMLElement));
	}

	/**
	 * Iterates over each descendant matching the selector, invoking the callback.
	 * @param {string} selector - CSS selector to search for.
	 * @param {(VexdElement: VexdElement, index: number) => void} callback - Function to call for each element.
	 */
	each(
		selector: string,
		callback: (VexdElement: VexdElement, index: number) => void
	): void {
		this.all(selector).forEach((VexdElement, index) =>
			callback(VexdElement, index)
		);
	}

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
	html(content?: string): string | VexdElement {
		if (!content) {
			return this.el.innerHTML;
		}
		this.el.innerHTML = content;
		return this;
	}

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
	text(content?: string): string | VexdElement {
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
	event(eventName: string, callback: (e: Event) => void): () => void {
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
	once(eventName: string, callback: (e: Event) => void): VexdElement {
		this.el.addEventListener(eventName, callback, { once: true });
		return this;
	}

	/**
	 * Dispatches a custom event.
	 * @param {string} eventName - Custom event name.
	 * @param {{ [key: string]: any }} [details={}] - Event details.
	 * @returns {VexdElement} The current VexdElement instance.
	 */
	emit(eventName: string, details: { [key: string]: any } = {}): VexdElement {
		const event = new CustomEvent(eventName, { detail: details });
		this.el.dispatchEvent(event);
		return this;
	}

	/**
	 * Adds a class to the element.
	 * @param {string} className - Class name to add.
	 * @returns {VexdElement} The current VexdElement instance.
	 */
	addClass(className: string): VexdElement {
		this.el.classList.add(className);
		return this;
	}

	/**
	 * Removes a class from the element.
	 * @param {string} className - Class name to remove.
	 * @returns {VexdElement} The current VexdElement instance.
	 */
	removeClass(className: string): VexdElement {
		this.el.classList.remove(className);
		return this;
	}

	/**
	 * Toggles a class on the element.
	 * @param {string} className - Class name to toggle.
	 * @returns {VexdElement} The current VexdElement instance.
	 */
	toggleClass(className: string): VexdElement {
		this.el.classList.toggle(className);
		return this;
	}

	/**
	 * checks if the element has a specific class.
	 * @param {string} className - Class name to check.
	 * @returns {boolean} True if the element has the class.
	 */
	hasClass(className: string): boolean {
		return this.el.classList.contains(className);
	}

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
	attr(attribute: string, value?: string): string | VexdElement {
		if (value === undefined) {
			return this.el.getAttribute(attribute) || "";
		} else {
			this.el.setAttribute(attribute, value);
			return this;
		}
	}

	/**
	 * checks if the element has a specific attribute.
	 * @param {string} attribute - Attribute name.
	 * @returns {boolean} True if the attribute exists.
	 */
	hasAttr(attribute: string): boolean {
		return this.el.hasAttribute(attribute);
	}

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
	data(attribute: string, value?: string): string | VexdElement {
		if (value === undefined) {
			return this.el.dataset[attribute] || "";
		} else {
			this.el.dataset[attribute] = value;
			return this;
		}
	}

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
	style(property: string, value?: string): string | VexdElement {
		if (value === undefined) {
			return this.el.style.getPropertyValue(property);
		} else {
			this.el.style.setProperty(property, value);
			return this;
		}
	}

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
	prop<T>(propertyName: keyof T, value?: T[keyof T]): T[keyof T] | VexdElement {
		if (value === undefined) {
			return (this.el as any)[propertyName];
		} else {
			(this.el as any)[propertyName] = value;
			return this;
		}
	}

	/**
	 * Filters descendant elements matching the selector and predicate.
	 * @param {string} selector - CSS selector.
	 * @param {(VexdElement: VexdElement) => boolean} predicate - Predicate function.
	 * @returns {VexdElement[]} Array of VexdElement instances that match the predicate.
	 */
	where(
		selector: string,
		predicate: (VexdElement: VexdElement) => boolean
	): VexdElement[] {
		return this.all(selector).filter((VexdElement) => predicate(VexdElement));
	}

	/**
	 * filters descendant elements matching the selector that do NOT satisfy the predicate.
	 * @param {string} selector - CSS selector.
	 * @param {(VexdElement: VexdElement) => boolean} predicate - Predicate function.
	 * @returns {VexdElement[]} Array of VexdElement instances that do not match the predicate.
	 */
	excluding(
		selector: string,
		predicate: (vexEl: VexdElement) => boolean
	): VexdElement[] {
		return this.all(selector).filter((vEl) => !predicate(vEl));
	}

	/**
	 * returns the closest ancestor (or self) that matches the selector.
	 * @param {string} selector - CSS selector.
	 * @returns {VexdElement | null} Closest matching VexdElement instance or null.
	 */
	closest(selector: string): VexdElement | null {
		const found = this.el.closest(selector);
		return found ? new VexdElement(found as HTMLElement) : null;
	}

	/**
	 * returns the parent element as a VexdElement instance.
	 * @returns {VexdElement | null} The parent VexdElement instance or null.
	 */
	parent(): VexdElement | null {
		return this.el.parentElement
			? new VexdElement(this.el.parentElement)
			: null;
	}

	/**
	 * returns an array of children as VexdElement instances.
	 * @returns {VexdElement[]} Array of child VexdElement instances.
	 */
	children(): VexdElement[] {
		return Array.from(this.el.children).map(
			(child) => new VexdElement(child as HTMLElement)
		);
	}

	/**
	 * returns the underlying native HTMLElement.
	 * @returns {HTMLElement} The native DOM element.
	 */
	native(): HTMLElement {
		return this.el;
	}

	/**
	 * uses the MutationObserver API to observe changes to a specific attribute.
	 * @param {string} attribute - Attribute name to observe.
	 * @param {(oldValue: string | null, newValue: string | null) => void} callback - Callback when attribute changes.
	 * @returns {() => void} Function to disconnect the observer.
	 */
	observe(
		attribute: string,
		callback: (oldValue: string | null, newValue: string | null) => void
	): () => void {
		const observer = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (
					mutation.type === "attributes" &&
					mutation.attributeName === attribute
				) {
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
	intersection(
		onScreen: (entry: IntersectionObserverEntry) => void,
		offScreen: (entry: IntersectionObserverEntry) => void,
		options?: IntersectionObserverInit
	): () => void {
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
	timedClass(className: string, duration: number | Promise<any>): VexdElement {
		this.addClass(className);
		if (typeof duration === "number") {
			setTimeout(() => {
				this.removeClass(className);
			}, duration);
		} else if (duration && typeof duration.then === "function") {
			duration.then(() => this.removeClass(className));
		}
		return this;
	}

	/**
	 * equivalent to .appendChild
	 * @param el
	 * @returns {VexdElement}
	 */
	add(el: HTMLElement | string | VexdElement): VexdElement {
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
	empty(): VexdElement {
		this.el.innerHTML = "";
		return this;
	}

	/**
	 * adds the CSS declaration to the element's style.
	 * @param cssDeclaration
	 * @returns
	 */
	css(cssDeclaration: Partial<CSSStyleDeclaration>): VexdElement {
		Object.assign(this.el.style, cssDeclaration);
		return this;
	}

	/**
	 * defines a mouseenter and mouseleave event.
	 * @param mouseEnter
	 * @param mouseLeave
	 * @returns {() => void} function to remove the event listeners.
	 */
	onHover(
		mouseEnter: (e: Event) => void,
		mouseLeave: (e: Event) => void
	): VoidFunction {
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
	onClick(callback: (e: Event) => void): VoidFunction {
		this.el.addEventListener("click", callback);
		return () => this.el.removeEventListener("click", callback);
	}

	/**
	 * equivalent to addEventListener("change", callback)
	 * @param callback
	 * @returns {() => void} function to remove the event listener.
	 */
	onChange(callback: (e: Event) => void): VoidFunction {
		this.el.addEventListener("change", callback);
		return () => this.el.removeEventListener("change", callback);
	}

	/**
	 * gets or sets the value of an input element.
	 * @overload
	 * @returns {string} The value of the input element
	 */
	value(): string;
	/**
	 * sets the value of an input element and returns the instance.
	 * @param {string} value - New value.
	 * @returns {VexdElement} The current VexdElement instance.
	 */
	value(value: string): VexdElement;
	value(value?: string): string | VexdElement {
		if (value === undefined) {
			return (this.el as HTMLInputElement).value;
		}
		(this.el as HTMLInputElement).value = value;
		return this;
	}

	/**
	 * sets the element's disabled property.
	 * @param predicate
	 * @returns {VexdElement}
	 */
	disable(predicate?: boolean): VexdElement {
		this.prop("disabled", !!predicate);
		return this;
	}

	/**
	 * returns the element's aria attribute.
	 * @overload
	 * @param attribute
	 */
	aria(attribute: string): string;
	/**
	 * sets the element's aria attribute.
	 * (e.g aria("label", "my label")) -> aria-label="my label"
	 * @param attribute
	 * @param value
	 * @returns {VexdElement}
	 */
	aria(attribute: string, value?: string): string | VexdElement {
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
	position(): DOMRect {
		return this.el.getBoundingClientRect();
	}

	/**
	 * returns the element's offset position.
	 * @returns {top: number, left: number}
	 */
	offset(): { top: number; left: number } {
		const { top, left } = this.el.getBoundingClientRect();
		return { top, left };
	}

	/**
	 * removes the element from the DOM.
	 * @overload
	 * @returns {void}
	 */
	remove(): void;
	/**
	 * removes all descendants matching the selector.
	 * @param selector
	 */
	remove(selector: string): void;
	remove(selector?: string) {
		if (!selector) {
			this.el.remove();
			return;
		}
		this.all(selector).forEach((el) => el.remove());
	}
}
