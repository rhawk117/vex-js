type CallbackOrValue<T> = T | ((oldState: T) => T);
/**
 * Core reactive state management class
 */
export declare class VexdState<T> {
    private value;
    private subscribers;
    constructor(initialValue: T);
    get state(): T;
    /**
     * Update state with a new value or using a function that receives the previous state
     * @param newState New value or function to transform the current state
     */
    setState(newState: CallbackOrValue<T>): void;
    /**
     * Register a side effect function that runs on state changes
     * @param fn Function to execute when state changes
     * @param triggerNow Whether to execute the function immediately
     * @returns Unsubscribe function
     */
    sideEffect(fn: (newState: T) => void, triggerNow?: boolean): () => void;
    /**
     * Remove all subscribers
     */
    clear(): void;
}
/**
 * extended state management class for arrays with helper methods
 */
export declare class VexdStateList<T> extends VexdState<T[]> {
    /**
     * add an item to the list
     * @param item Item to add
     */
    add(item: T): void;
    /**
     * Remove items that match the predicate
     * @param predicate Function that returns true for items to keep
     */
    remove(predicate: (item: T) => boolean): void;
    /**
     * Transform each item in the list
     * @param callback Mapping function
     */
    map(callback: (item: T) => T): void;
    /**
     * Find an item in the list
     * @param predicate Function that returns true when the desired item is found
     * @returns The found item or undefined
     */
    find(predicate: (item: T) => boolean): T | undefined;
    /**
     * Filter the list without modifying the original
     * @param predicate Function that returns true for items to include
     * @returns A new filtered array
     */
    filter(predicate: (item: T) => boolean): T[];
}
export {};
