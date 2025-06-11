export interface IPopupData {
	content: HTMLElement;
}

export interface IPopup {
	set content(content: HTMLElement);
	//content: HTMLElement;
	closeButton: HTMLButtonElement;
	open(): void;
	close(): void;
	//handleESC(evt: KeyboardEvent): void;
	render(data: IPopupData): HTMLElement
}
