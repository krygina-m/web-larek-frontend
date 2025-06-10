import { ICategory } from '../model/IData';
import { IProductCatalogActions } from './IProductCatalog';

export interface IProductPreviewData {
	id: string;
	title: string;
	description: string;
	image: string;
	category: ICategory;
	price: number | null;
	isInBasket: boolean;
}

export interface IProductPreviewView {
	set description(description: string);
	set price(price: number | null);
	set isInBasket(state: boolean);
}
