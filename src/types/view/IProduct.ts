export type ICategory =
	| 'хард-скил'
	| 'софт-скил'
	| 'кнопка'
	| 'дополнительное'
	| 'другое';


export interface IProduct {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ICategory;
	price: number | null;
	isInBasket: boolean;
}

export interface IProductView {
	set id(id: string);
	get id(): string;
	set title(title: string);
	get title(): string;
	set price(price: number | null);
	get price(): number | null;
	set image(src: string);
	set category(category: ICategory);
	set description(description: string);
	set isInBasket(state: boolean);
}
