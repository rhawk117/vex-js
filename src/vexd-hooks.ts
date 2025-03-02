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
function createInterval(timerFn: () => void, ms: number = 1000): VexTimedHook {
	let intervalId: number | null = null;

	const start = () => {
		if (intervalId) stop();
		intervalId = setInterval(timerFn, ms);
	};

	const stop = () => {
		if (!intervalId) return;
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
function createTimer(timerFn: () => void, ms: number = 1000): VexTimedHook {
	let timeoutId: number | null = null;

	const start = () => {
		if (timeoutId) stop();
		timeoutId = setTimeout(timerFn, ms);
	};

	const stop = () => {
		if (!timeoutId) return;
		clearTimeout(timeoutId);
		timeoutId = null;
	};

	const reset = () => {
		stop();
		start();
	};

	return { start, stop, reset };
}

type EffectStore = readonly [
	(effect: VoidFunction) => VoidFunction,
	VoidFunction
];

/**
 * Creates a store for tracking and disposing of effects
 * @returns A tuple containing an addEffect function and a dispose function
 */
function effectStore(): EffectStore {
	const effects: VoidFunction[] = [];

	const addEffect = (effect: VoidFunction): VoidFunction => {
		effects.push(effect);
		return () => {
			const index = effects.indexOf(effect);
			if (index !== -1) effects.splice(index, 1);
		};
	};

	const dispose = () => {
		effects.forEach((disposeFn) => {
			if (disposeFn) disposeFn();
		});
	};

	return [addEffect, dispose] as const;
}

/**
 * create a reactive state container
 * @param initialValue Initial state value
 * @returns A VexdState instance
 */
function state<T>(initialValue: T): VexdState<T> {
	return new VexdState<T>(initialValue);
}

/**
 * create a reactive state container for an array
 * @param initialValue Initial array value
 * @returns A VexdStateList instance
 */
function stateList<T>(initialValue: T[] = []): VexdStateList<T> {
	return new VexdStateList<T>(initialValue);
}

/**
 * create a managed AJAX request
 * @param url The endpoint URL
 * @param options Request configuration options
 * @returns A controllable request object with state management
 */

export {
	createInterval,
	createTimer,
	effectStore,
	state,
	stateList,
	VexdState,
	VexdStateList,
	VexTimedHook,
};
