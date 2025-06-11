import { IProduct } from './IProduct';

export type ICategory =
	| 'хард-скил'
	| 'софт-скил'
	| 'кнопка'
	| 'дополнительное'
	| 'другое';


type PaymentMethod = 'card' | 'cash';

export interface IContactsOrder {
	email: string;
	phone: string;
	payment: PaymentMethod;
	address: string;
	//validate(email: string, phone: string, address: string): boolean
}

export interface IOrder extends IContactsOrder {
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export type IFormErrors = Partial<Record<keyof IContactsOrder, string>>;

export interface ICatalogData {
	productList: IProduct[];
	preview: string | null;
	order: IContactsOrder;
}

export interface ICatalogModel {
	productList: IProduct[];
	preview: string | null;
	order: Partial<IContactsOrder>;
	formErrors: IFormErrors;

	setItems(items: IProduct[]): void;
	setItem(item: IProduct): void;
	addProductToBasket(item: IProduct): void;
	removeProductFromBasket(item: IProduct): void;
	getBasketItems(): IProduct[];
	getTotalPrice(): number;

	setOrderField<T extends keyof IContactsOrder>(
		field: T,
		value: IContactsOrder[T]
	): void;

	validateOrder(): boolean;
	clearBasket(): void;
	clearOrder(): void;
}
