import { ensureElement } from '../../utils/utils';
import { ICategory, IProduct, IProductView } from '../../types/model/IProduct';
import { View } from '../base/view';

export class ProductView<T = IProduct> extends View<T> implements IProductView {
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement) {
		super(container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
	}

	set id(id: string) {
		this.container.dataset.id = id;
	}
	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(title: string) {
		this.setTextContent(this._title, title);
	}
	get title(): string {
		return this._title.textContent || '';
	}

	set description(description: string) {
		this.setTextContent(this._description, description);
	}

	set image(src: string) {
		this.container.dataset.src = src;
	}
	
	set category(category: ICategory) {
		this.container.dataset.category = category;
	}

	set price(price: number | null) {
		if (price) {
			this.setTextContent(this._price, `${price} синапсов`);
		} else {
			this.setTextContent(this._price, 'Бесценно');
		}
	}
	get price(): number | null {
		if (this._price.textContent === 'Бесценно') return null;
		return parseInt(this._price.textContent.replace(/\s/g, ''));
	}

	set isInBasket(state: boolean) {
		if (state) this.setTextContent(this._button, 'Убрать из корзины');
		else this.setTextContent(this._button, 'В корзину');
	}


}
