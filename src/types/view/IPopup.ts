export interface IPopupData {
	content: HTMLElement;
}


/*export interface IModalView {
	set content(content: HTMLElement);
	open(): void;
	close(): void;
	render(data: IModalData): HTMLElement;
}
*/

export interface IPopupView {
	set content(content: HTMLElement);
	content: HTMLElement;
	closeButton: HTMLButtonElement;
	open(): void;
	close(): void;
	//handleESC(evt: KeyboardEvent): void;
	render(data: IPopupData): HTMLElement
}
