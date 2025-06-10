import { ICategory } from './IProduct';

export interface IProductCatalogActions {
	onClick: (event: MouseEvent) => void;
}

export type ICategoryNames = Record<ICategory, string>;

export interface IProductCatalogData {
	title: string;
	image: string;
	category: ICategory;
	price: number | null;
}

export interface IProductCatalogView {
	set image(src: string);
	set category(category: ICategory);
}
