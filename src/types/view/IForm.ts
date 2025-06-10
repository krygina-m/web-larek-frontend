export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface IFormView<T> {
	set valid(state: boolean);
	set errors(errors: string);
	onInputChange(field: keyof T, value: string): void;
	clearForm(): void;
	render(state: Partial<T> & IForm): HTMLFormElement;
}
