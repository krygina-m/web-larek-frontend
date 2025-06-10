import { ensureElement } from '../../utils/utils';
import { IProductCatalogActions } from '../../types/view/IProduct';
import {
		IProductPreviewView
} from '../../types/view/IProduct';
import { IProduct } from '../../types/view/IProduct';
import { ProductCatalogView } from './ProductCatalog';

export class ProductPreviewView
	extends ProductCatalogView<IProduct>
	implements IProductPreviewView
{
	protected _description: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IProductCatalogActions) {
		super(container);
		this._description = ensureElement<HTMLElement>('.card__text', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set description(description: string) {
		this.setTextContent(this._description, description);
	}

	set price(price: number | null) {
		super.price = price;
		if (price === null) this.setDisabled(this._button, true);
	}

	set isInBasket(state: boolean) {
		if (state) this.setTextContent(this._button, 'Убрать из корзины');
		else this.setTextContent(this._button, 'В корзину');
	}
}
