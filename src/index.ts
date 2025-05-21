import './scss/styles.scss';

/**
 * Интерфейс корзины из видео
 */
interface IBasketModel {
  items: Map<string, number>;
  add(id: string): void;
  remove(id: string): void;
}

interface IEventEmitter {
  emit: (event: string, data: unknown) => void;
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
 * Интерфейс каталога
 */
interface ICatalogModel {
	items: IProduct[];
	setItems(items: IProduct[]): void;
	getProduct(id: string): IProduct;
}

/**
 * Интерфейс ????
 */
interface IViewConstructor {
	new (container: HTMLElement, events?: IEventEmitter): IView;
}

/**
 * Интерфейс базового класса вью
 */
interface IView {
	render(data?: object): HTMLElement;
}

/**
 * Class корзины из видео КЛАССЫ НЕ НАДО В 8-М СПРИНТЕ. ТОЛЬКО В 9-М	
 */
class BasketModel implements IBasketModel {
  items: Map<string, number> = new Map();
  add(id: string): void {
    if(!this.items.has(id)) this.items.set(id, 0);
    this.items.set(id, this.items.get(id)! + 1);
  };
  remove(id: string): void {
    if (!this.items.has(id)) return;
    if (this.items.get(id)! > 0) {
      this.items.set(id, this.items.get(id)! - 1);
      if (this.items.get(id) === 0) this.items.delete(id);
    }
  };
}
/**
 * Интерфейс для хранения состояния приложения.
 */
 interface IAppStateModel {
	catalog: IProduct[];
	basket: string[];
	order: IOrderForm | null;
}

/**
 * Интерфейс для данных корзины.
 */
 interface IBasketCard {
	title: string;
	price: number;
}

/**
 * Интерфейс для данных успешного выполнения операции.
 */
 interface ISuccess {
	total: number;
}

/**
 * Интерфейс для данных формы заказа.
 */
 interface IOrderForm {
	payment: PaymentMethod;
	email: string;
	phone: string;
	address: string;
	total: number;
	items: string[];
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
 interface IModal {
	content: HTMLElement;
}

/**
 * Интерфейс для обработчика событий успешного выполнения операции.
 */
 interface ISuccessActions {
	onClick: () => void;
}

/**
 * Интерфейс для данных страницы.
 */
 interface IPage {
	counter: number | null;
	catalog: HTMLElement[];
	locked: boolean;
}

/**
 * Интерфейс для общего количества элементов с типом T.
 */
 interface ITotalItems<T> {
	total: number;
	items: T[];
}

/**
 * Интерфейс для представления данных в корзине.
 */
 interface IBasketData {
	items: HTMLElement[];
	total: number;
}

/**
 * Интерфейс для представления данных на странице.
 */
 interface IPageData {
	counter: number;
	catalog: HTMLElement[];
	locked: boolean;
}

/**
 * Интерфейс для обработчика событий карточки товара.
 */
 interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

/**
 * Интерфейс для API ларька.
 */
 interface ILarekApi {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	orderProduct: (order: IOrderForm) => Promise<IOrderResult>;
}

/**
 * Интерфейс для результата заказа.
 */
 interface IOrderResult {
	id: string;
	total: number;
}


/**
 * Интерфейс для данных заказа на доставку.
 */
 interface IContactsOrder {
	email: string;
	phone: string;
}

/**
 * Интерфейс для данных адреса заказа.
 */
 interface IOrderAddress {
	payment: PaymentMethod;
	address: string;
}

/**
 * Перечисление для метода оплаты.
 */
 type PaymentMethod = 'card' | 'cash';

/**
 * Тип для ошибок формы.
 */
 type FormErrors = Partial<Record<keyof IOrderForm, string>>; 