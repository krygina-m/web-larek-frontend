import { IEventEmitter } from '../base/IEventEmitter';

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export interface IFormViewConstructor<T> {
	new (container: HTMLFormElement, events: IEventEmitter): IFormView<T>;
}

export interface IFormView<T> {
	set valid(state: boolean);
	set errors(errors: string);
	clearForm(): void;
	render(state: Partial<T> & IFormState): HTMLFormElement;
}
