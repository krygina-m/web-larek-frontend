export interface IViewConstructor {
	new (container: HTMLElement): IView;
}

export interface IView {
	toggleClass(element: HTMLElement, className: string, state?: boolean): void;
	render(data?: object): HTMLElement;
}
