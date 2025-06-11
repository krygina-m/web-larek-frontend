import { ICategory } from '../../types/model/IProduct';
import { IProductCatalogActions } from '../../types/model/IProduct';
import { IProduct } from '../../types/model/IProduct';
import {
	ICategoryNames,
	IProductCatalogView,
} from '../../types/model/IProduct';
import { ProductView } from '../model/Product';

export class ProductCatalogView<T = IProduct>
	extends ProductView<T>
	implements IProductCatalogView
{
	protected _category: HTMLElement;
	protected _image: HTMLImageElement;

	static categories: ICategoryNames = {
		'хард-скил': 'hard',
		'софт-скил': 'soft',
		кнопка: 'button',
		дополнительное: 'additional',
		другое: 'other',
	};

	constructor(container: HTMLElement, actions?: IProductCatalogActions) {
		super(container);
		this._category = container.querySelector('.card__category');
		this._image = container.querySelector('.card__image');
		if (actions?.onClick) container.addEventListener('click', actions.onClick);
	}

	set image(src: string) {
		this.setImage(this._image, src, this.title);
	}

	set category(category: ICategory) {
		this._category.classList.add(
			`card__category_${ProductCatalogView.categories[category]}`
		);
		this.setTextContent(this._category, category);
	}
}
