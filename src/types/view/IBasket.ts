export interface IBasketModel {
	items: Map<string, number>;
	total: number;
}

export interface IBasketView {
	set items(items: HTMLElement[]);
	set total(total: number);
}
