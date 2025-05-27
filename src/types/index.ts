/**
 * Интерфейс корзины
 */
interface IBasketModel {
	items: Map<string, number>;
	add(id: string): void;
	remove(id: string): void;
	purchaseCost(cost: number): number;
}

interface IBasketView {
	render(): void; // метод для первоначального рендеринга корзины
	update(items: Map<string, number>): void; // метод для обновления отображения корзины при изменении данных
	clear(): void; // метод для очистки корзины
}


interface IEventEmitter {
	emit: (event: string, data: unknown) => void;
	on(event: string, callback: Function): void;
	off(event: string, callback: Function): void
}

/**
 * Интерфейс продукта
 */
interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

/**
 * Интерфейс для данных формы заказа.
 */
interface IOrder {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
}

/**
 * Интерфейс каталога
 */
interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getItems(): IProduct[];
	getItem(id: string): IProduct;
}

/**
 * Интерфейс базового класса вью
 */
interface IView {
	render(data?: object): HTMLElement;
}

/**
 * Интерфейс для формы.
 */
interface IForm {
	submit: HTMLButtonElement;
	errors: HTMLElement;
	onInputChange(): void;
	render(state: `Partial<T>` & IFormState): HTMLElement;
}

/**
 * Интерфейс для состояния формы.
 */
interface IFormState {
	valid: boolean;
	errors: string[];
}

/** 
 * Интерфейс для модального окна. 
 */

interface IPopup {
	content: HTMLElement;
	closeButton: HTMLButtonElement;
	open(): void;
	close(): void;
	handleESC(evt: KeyboardEvent): void;
	render(data: IPopup): boolean
}

/**
 * Интерфейс для обработчика событий успешного выполнения операции.
 */
interface ISuccess {
	total: number;
}

/**
 * Интерфейс для API ларька.
 */
interface IApi {
	baseUrl: string;
	options: RequestInit;
	handleResponse(response: Response): Promise<object>;
	get(uri: string): Promise<object>;
	post(uri: string, data: object, method: string): Promise<object>
}

/**
 * Интерфейс для данных заказа на доставку.
 */
interface IContactsOrder {
	email: string;
	phone: string;
	payment: PaymentMethod;
	address: string;
	validate(email: string, phone: string, address: string): boolean
}

/**
 * Перечисление для метода оплаты.
 */
type PaymentMethod = 'card' | 'cash';

/**
 * Тип для ошибок формы.
 */
type FormErrors = Partial<Record<keyof IOrder, string>>; 
