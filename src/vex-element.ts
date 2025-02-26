/**
 * @file VexElement.ts
 * @description A lightweight DOM utility class for chainable element manipulation, animations, and reactive signals.
 */

export class VexElement {
	private el: HTMLElement;
	private static animationsInjected: boolean = false;

	/**
	 * creates an instance of VexElement.
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
	 * returns a new VexElement instance wrapping the first descendant matching the selector.
	 * @param {string} selector - CSS selector to search for.
	 * @returns {VexElement} A new VexElement instance.
	 * @throws Will throw an error if no element is found.
	 */
	select(selector: string): VexElement {
		const found = this.el.querySelector(selector);
		if (!found) {
			throw new Error(`VexJS: element not found for selector: ${selector}`);
		}
		return new VexElement(found as HTMLElement);
	}

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
	id(elementId?: string): string | VexElement {
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
	all(selector: string): VexElement[] {
		const nodeList = this.el.querySelectorAll(selector);
		return Array.from(nodeList).map((el) => new VexElement(el as HTMLElement));
	}

	/**
	 * Iterates over each descendant matching the selector, invoking the callback.
	 * @param {string} selector - CSS selector to search for.
	 * @param {(VexElement: VexElement, index: number) => void} callback - Function to call for each element.
	 * @returns {VexElement[]} Array of VexElement instances.
	 */
	each(
		selector: string,
		callback: (VexElement: VexElement, index: number) => void
	): VexElement[] {
		const elements = this.all(selector);
		elements.forEach((VexElement, index) => callback(VexElement, index));
		return elements;
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	html(content: string): VexElement;
	html(content?: string): string | VexElement {
		if (content === undefined) {
			return this.el.innerHTML;
		} else {
			this.el.innerHTML = content;
			return this;
		}
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	text(content: string): VexElement;
	text(content?: string): string | VexElement {
		if (content === undefined) {
			return this.el.textContent || "";
		} else {
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	once(eventName: string, callback: (e: Event) => void): VexElement {
		this.el.addEventListener(eventName, callback, { once: true });
		return this;
	}

	/**
	 * Dispatches a custom event.
	 * @param {string} eventName - Custom event name.
	 * @param {{ [key: string]: any }} [details={}] - Event details.
	 * @returns {VexElement} The current VexElement instance.
	 */
	emit(eventName: string, details: { [key: string]: any } = {}): VexElement {
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
	classed(className: string): VexElement {
		this.el.classList.add(className);
		return this;
	}

	/**
	 * Removes a class from the element.
	 * @param {string} className - Class name to remove.
	 * @returns {VexElement} The current VexElement instance.
	 */
	declass(className: string): VexElement {
		this.el.classList.remove(className);
		return this;
	}

	/**
	 * Toggles a class on the element.
	 * @param {string} className - Class name to toggle.
	 * @returns {VexElement} The current VexElement instance.
	 */
	toggleClass(className: string): VexElement {
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	attr(attribute: string, value: string): VexElement;
	attr(attribute: string, value?: string): string | VexElement {
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	data(attribute: string, value: string): VexElement;
	data(attribute: string, value?: string): string | VexElement {
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	style(property: string, value: string): VexElement;
	style(property: string, value?: string): string | VexElement {
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	prop<T>(propertyName: keyof T, value: T[keyof T]): VexElement;
	prop<T>(propertyName: keyof T, value?: T[keyof T]): T[keyof T] | VexElement {
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
	 * @param {(VexElement: VexElement) => boolean} predicate - Predicate function.
	 * @returns {VexElement[]} Array of VexElement instances that match the predicate.
	 */
	where(
		selector: string,
		predicate: (VexElement: VexElement) => boolean
	): VexElement[] {
		return this.all(selector).filter((VexElement) => predicate(VexElement));
	}

	/**
	 * filters descendant elements matching the selector that do NOT satisfy the predicate.
	 * @param {string} selector - CSS selector.
	 * @param {(VexElement: VexElement) => boolean} predicate - Predicate function.
	 * @returns {VexElement[]} Array of VexElement instances that do not match the predicate.
	 */
	excluding(
		selector: string,
		predicate: (vexEl: VexElement) => boolean
	): VexElement[] {
		return this.all(selector).filter((vEl) => !predicate(vEl));
	}

	/**
	 * returns the closest ancestor (or self) that matches the selector.
	 * @param {string} selector - CSS selector.
	 * @returns {VexElement | null} Closest matching VexElement instance or null.
	 */
	closest(selector: string): VexElement | null {
		const found = this.el.closest(selector);
		return found ? new VexElement(found as HTMLElement) : null;
	}

	/**
	 * returns the parent element as a VexElement instance.
	 * @returns {VexElement | null} The parent VexElement instance or null.
	 */
	parent(): VexElement | null {
		return this.el.parentElement ? new VexElement(this.el.parentElement) : null;
	}

	/**
	 * returns an array of children as VexElement instances.
	 * @returns {VexElement[]} Array of child VexElement instances.
	 */
	children(): VexElement[] {
		return Array.from(this.el.children).map(
			(child) => new VexElement(child as HTMLElement)
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
	 * Observes attribute changes on the element.
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
	 * @returns {VexElement} The current VexElement instance.
	 */
	timedClass(className: string, duration: number | Promise<any>): VexElement {
		this.classed(className);
		if (typeof duration === "number") {
			setTimeout(() => {
				this.declass(className);
			}, duration);
		} else if (duration && typeof duration.then === "function") {
			duration.then(() => this.declass(className));
		}
		return this;
	}

	/**
	 * injects animation CSS if not already injected.
	 * @private
	 */
	private static ensureAnimationsInjected(): void {
		if (VexElement.animationsInjected) return;
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
	private animateClass(
		animationClass: string,
		duration: number,
		onComplete?: () => void
	): VexElement {
		VexElement.ensureAnimationsInjected();
		this.el.style.setProperty("--vex-duration", `${duration}ms`);
		this.classed(animationClass);
		setTimeout(() => {
			this.declass(animationClass);
			if (onComplete) onComplete();
		}, duration);
		return this;
	}

	/**
	 * fades in the element.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	fadeIn(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-fade-in", duration, onComplete);
	}

	/**
	 * fades out the element.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	fadeOut(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-fade-out", duration, onComplete);
	}

	/**
	 * Slides the element in from the left.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	slideRight(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-slide-right", duration, onComplete);
	}

	/**
	 * Slightly moves the element to the left.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	slightLeft(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-slight-left", duration, onComplete);
	}

	/**
	 * Slightly moves the element down.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	slightDown(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-slight-down", duration, onComplete);
	}

	/**
	 * Slides the element up.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	slideUp(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-slide-up", duration, onComplete);
	}

	/**
	 * rotates the element.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	spins(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-spins", duration, onComplete);
	}

	/**
	 * Bounces the element.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	bounces(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-bounces", duration, onComplete);
	}

	/**
	 * Blinks the element's text.
	 * @param {number} duration - Duration in ms.
	 * @param {() => void} [onComplete] - Callback after animation completes.
	 * @returns {VexElement} The current VexElement instance.
	 */
	blinkText(duration: number, onComplete?: () => void): VexElement {
		return this.animateClass("vex-anim-blink-text", duration, onComplete);
	}
}
