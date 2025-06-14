import { ensureElement } from '../../utils/utils';
import { IProductCatalogActions } from '../../types/model/IProduct';
import { IProductBasketView } from '../../types/model/IProduct';
import { IProduct } from '../../types/model/IProduct';
import { ProductView } from '../view/Product';

export class ProductBasketView extends ProductView<IProduct> 
  implements IProductBasketView
{
	protected _index: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: IProductCatalogActions) {
		super(container);
		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._button = ensureElement<HTMLButtonElement>('.card__button', container);

		if (actions?.onClick) {
			this._button.addEventListener('click', actions.onClick);
		}
	}

	set index(index: number) {
		this.setTextContent(this._index, String(index));
	}
}
