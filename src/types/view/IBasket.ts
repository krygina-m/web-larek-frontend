export interface IBasketData {
	items: HTMLElement[];
	total: number;
}

export interface IBasketView {
	set items(items: HTMLElement[]);
	set total(total: number);
}
