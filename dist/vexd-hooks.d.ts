export type StateHook<T> = T | ((prevState: T) => T | void) | undefined;
export type SideEffect<T> = (newState: T) => void;
export type VexdState<T> = [
	(sideEffect: SideEffect<T>) => void,
	(state: StateHook<T>) => T
];

export interface VexdTimerBase {
	start: () => void;
	stop: () => void;
	reset: () => void;
}
export interface VexdTimer extends VexdTimerBase {}
export interface VexdInterval extends VexdTimerBase {}
