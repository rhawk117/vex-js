export type SideEffect<T> = (newState: T) => void;
export type OptionalFunctionOrValue = T | ((oldState: T) => T) | undefined;
export interface VexdState<T> {
	state(): T;
	state: (newState: () => T) => T;
	effect: (fn: SideEffect<T>, triggerNow?: boolean) => void;
}

export interface VexdTimerBase {
	start: () => void;
	stop: () => void;
	reset: () => void;
}

export type VexdSignal<T> = readonly [
	(fn: VoidFunction) => void,
	(newValue: T) => void
];

export interface VexdTimer extends VexdTimerBase {}
export interface VexdInterval extends VexdTimerBase {}

export type EffectStore = readonly [
	(effect: VoidFunction) => VoidFunction,
	VoidFunction
];
