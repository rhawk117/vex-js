type CallbackOrValue<T> = T | ((oldState: T) => T);
/**
 * Core reactive state management class
 */
export class VexdState<T> {
	private value: T;
	private subscribers: ((newState: T) => void)[] = [];

	constructor(initialValue: T) {
		this.value = initialValue;
	}

	public get state(): T {
		return this.value;
	}

	/**
	 * Update state with a new value or using a function that receives the previous state
	 * @param newState New value or function to transform the current state
	 */
	public setState(newState: CallbackOrValue<T>): void {
		const previousValue = this.value;

		if (typeof newState === "function") {
			this.value = (newState as (oldState: T) => T)(previousValue);
		} else {
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
	public sideEffect(
		fn: (newState: T) => void,
		triggerNow: boolean = false
	): () => void {
		if (triggerNow) {
			fn(this.value);
		}
		this.subscribers.push(fn);
		return () => {
			const index = this.subscribers.indexOf(fn);
			if (index !== -1) this.subscribers.splice(index, 1);
		};
	}

	/**
	 * Remove all subscribers
	 */
	public clear(): void {
		this.subscribers = [];
	}
}

/**
 * extended state management class for arrays with helper methods
 */
export class VexdStateList<T> extends VexdState<T[]> {
	/**
	 * add an item to the list
	 * @param item Item to add
	 */
	public add(item: T): void {
		this.setState((oldState) => [...oldState, item]);
	}

	/**
	 * Remove items that match the predicate
	 * @param predicate Function that returns true for items to keep
	 */
	public remove(predicate: (item: T) => boolean): void {
		this.setState((oldState) => oldState.filter((item) => !predicate(item)));
	}

	/**
	 * Transform each item in the list
	 * @param callback Mapping function
	 */
	public map(callback: (item: T) => T): void {
		this.setState((oldState) => oldState.map(callback));
	}

	/**
	 * Find an item in the list
	 * @param predicate Function that returns true when the desired item is found
	 * @returns The found item or undefined
	 */
	public find(predicate: (item: T) => boolean): T | undefined {
		return this.state.find(predicate);
	}

	/**
	 * Filter the list without modifying the original
	 * @param predicate Function that returns true for items to include
	 * @returns A new filtered array
	 */
	public filter(predicate: (item: T) => boolean): T[] {
		return this.state.filter(predicate);
	}
}
