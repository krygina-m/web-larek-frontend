export interface IProductBasketData {
	id: string;
	title: string;
	price: number;
	index: number;
}

export interface IProductBasketView {
	set index(index: number);
}
