import { ensureElement } from '../../utils/utils';
import { IEventEmitter } from '../../types/base/IEventEmitter';
import { IFormState, IFormView } from '../../types/view/IForm';
import { View } from '../base/view';

export class FormView<T> extends View<IFormState> implements IFormView<T> {
	protected _submitButton: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEventEmitter) {
		super(container);

		this._submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			container
		);

		this._errors = ensureElement<HTMLElement>('.form__errors', container);

		this.container.addEventListener('input', (evt: Event) => {
			const target = evt.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (evt: Event) => {
			evt.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string): void {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(state: boolean) {
		this.setDisabled(this._submitButton, !state);
	}

	set errors(errors: string) {
		this.setTextContent(this._errors, errors);
	}

	clearForm(): void {
		this.container.reset();
	}

	render(state: Partial<T> & IFormState): HTMLFormElement {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
