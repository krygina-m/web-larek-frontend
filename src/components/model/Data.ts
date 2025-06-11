import { IProduct } from '../../types/model/IProduct';
import {
	IContactsOrder,
	IFormErrors,
	ICatalogData,
	ICatalogModel,
} from '../../types/model/IData';
import { Model } from '../base/model';

export class CatalogModel extends Model<ICatalogData> implements ICatalogModel {
	productList: IProduct[];
	preview: string | null;
	order: Partial<IContactsOrder> = {};
	formErrors: IFormErrors;

	setItems(items: IProduct[]): void {
		this.productList = items;
		this.emitChanges('catalogModel:change', { productList: this.productList });
	}

	setItem(item: IProduct): void {
		this.preview = item.id;
		this.emitChanges('preview:change', item);
	}

	addProductToBasket(item: IProduct): void {
		item.isInBasket = true;
		this.emitChanges('backet:change', this.getBasketItems());
	}

	removeProductFromBasket(item: IProduct): void {
		item.isInBasket = false;
		this.emitChanges('backet:change');
	}

	getBasketItems(): IProduct[] {
		return this.productList.filter((item) => item.isInBasket);
	}

	getTotalPrice(): number {
		return this.getBasketItems().reduce((sum, item) => sum + item.price, 0);
	}

	setOrderField<T extends keyof IContactsOrder>(
		field: T,
		value: IContactsOrder[T]
	): void {
		this.order[field] = value;
		this.validateOrder();
	}

	validateOrder(): boolean {
		const errors: typeof this.formErrors = {};

		if (!this.order.payment) {
			errors.payment = 'Укажите способ оплаты.';
		}

		if (!this.order.address) {
			errors.address = 'Укажите адрес доставки.';
		}

		if (!this.order.email) {
			errors.email = 'Укажите email.';
		}

		if (!this.order.phone) {
			errors.phone = 'Укажите телефон.';
		}

		this.formErrors = errors;
		this.events.emit('formErrors:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	clearBasket(): void {
		this.productList.forEach((item) => (item.isInBasket = false));
		this.emitChanges('backet:change');
	}

	clearOrder(): void {
		this.order = {};
	}
}
