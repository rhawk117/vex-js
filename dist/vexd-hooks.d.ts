import { VexdState, VexdStateList } from "./vexd-state";
interface VexTimedHook {
    start: () => void;
    stop: () => void;
    reset: () => void;
}
/**
 * Creates a managed interval that can be started, stopped, and reset
 * @param timerFn Function to execute on each interval
 * @param ms Millisecond interval (defaults to 1000ms)
 * @returns Controlled interval hook
 */
declare function createInterval(timerFn: () => void, ms?: number): VexTimedHook;
/**
 * Creates a managed timeout that can be started, stopped, and reset
 * @param timerFn Function to execute after the timeout
 * @param ms Millisecond delay (defaults to 1000ms)
 * @returns Controlled timeout hook
 */
declare function createTimer(timerFn: () => void, ms?: number): VexTimedHook;
type EffectStore = readonly [
    (effect: VoidFunction) => VoidFunction,
    VoidFunction
];
/**
 * Creates a store for tracking and disposing of effects
 * @returns A tuple containing an addEffect function and a dispose function
 */
declare function effectStore(): EffectStore;
/**
 * create a reactive state container
 * @param initialValue Initial state value
 * @returns A VexdState instance
 */
declare function state<T>(initialValue: T): VexdState<T>;
/**
 * create a reactive state container for an array
 * @param initialValue Initial array value
 * @returns A VexdStateList instance
 */
declare function stateList<T>(initialValue?: T[]): VexdStateList<T>;
/**
 * create a managed AJAX request
 * @param url The endpoint URL
 * @param options Request configuration options
 * @returns A controllable request object with state management
 */
export { createInterval, createTimer, effectStore, state, stateList, VexdState, VexdStateList, VexTimedHook, };
