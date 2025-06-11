import './scss/styles.scss';

import { ensureElement, cloneTemplate } from './utils/utils';

import { API_URL, CDN_URL } from './utils/constants';
import { IProduct } from './types/model/IProduct';
import { IOrder } from './types/model/IData';
import { IContactsOrder } from './types/model/IData';
import { IFormErrors } from './types/model/IData';
import { EventEmitter } from './components/base/events';
import { PageView } from './components/view/Page';
import { ModalView } from './components/view/Popup';
import { BasketView } from './components/view/Basket';
import { CatalogModel } from './components/model/Data';
import { AppApi } from './components/model/AppAPI';
import { ProductCatalogView } from './components/view/ProductCatalog';
import { ProductPreviewView } from './components/view/ProductPreview';
import { ProductBasketView } from './components/view/ProductBasket';
import { PaymentAddressView } from './components/view/PaymentAddress';
import { ContactsView } from './components/view/Contacts';
import { SuccessView } from './components/view/Success';

const events = new EventEmitter();
const app = new CatalogModel({}, events);
const api = new AppApi(CDN_URL, API_URL);

const cardTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const paymentAddressTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const modalElement = ensureElement<HTMLElement>('#modal-container');

const page = new PageView(document.body, events);
const modal = new ModalView(modalElement, events);
const basket = new BasketView(cloneTemplate(basketTemplate), events);

const paymentAddress = new PaymentAddressView(
	cloneTemplate(paymentAddressTemplate),
	events
);

const contacts = new ContactsView(cloneTemplate(contactsTemplate), events);

const success = new SuccessView(cloneTemplate(successTemplate), {
	onClick: () => modal.close(),
});

api
	.getProductsList()
	.then(app.setItems.bind(app))
	.catch((err) => console.log(err));

events.onAll(({ eventName, data }) => console.log(eventName, data));

events.on('catalogModel:change', () => {
	page.productsList = app.productList.map((item) => {
		const card = new ProductCatalogView(cloneTemplate(cardTemplate), {
			onClick: () => {
				events.emit('card:select', item);
			},
		});

		return card.render({
			id: item.id,
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});

	page.basketCounter = app.getBasketItems().length;
});

events.on('card:select', (item: IProduct) => {
	app.setItem(item);
});

events.on('basketModel:add', (item: IProduct) => {
	app.addProductToBasket(item);
});

events.on('basketModel:remove', (item: IProduct) => {
	app.removeProductFromBasket(item);
});

events.on('preview:change', (item: ProductPreviewView) => {
	const card = new ProductPreviewView(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (item.isInBasket) events.emit('basketModel:remove', item);
			else events.emit('basketModel:add', item);
		},
	});
	events.on('basketModel:add', () => (card.isInBasket = true));

	events.on('basketModel:remove', () => (card.isInBasket = false));

	modal.render({
		content: card.render({
			id: item.id,
			title: item.title,
			description: item.description,
			image: item.image,
			category: item.category,
			price: item.price,
			isInBasket: item.isInBasket,
		}),
	});
});


events.on('basket:open', () => {
	modal.render({ content: basket.render({ total: app.getTotalPrice() }) });
});

events.on('backet:change', () => {
	page.basketCounter = app.getBasketItems().length;

	basket.items = app.getBasketItems().map((item, index) => {
		const card = new ProductBasketView(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				events.emit('basketModel:remove', item);
			},
		});

		return card.render({
			title: item.title,
			price: item.price,
			index: index + 1,
		});
	});

	basket.render({ total: app.getTotalPrice() });
});

events.on('order:open', () => {
	const valid = app.formErrors
		? !app.formErrors.payment && !app.formErrors.address
		: false;

	modal.render({
		content: paymentAddress.render({
			valid,
			errors: [],
		}),
	});
});

events.on(
	/^(contacts)\..*:change/,
	(data: { field: keyof IContactsOrder; value: string }) => {
		app.setOrderField(data.field, data.value);
	}
);

events.on(
	/^(order)\..*:change/,
	(data: { field: keyof IContactsOrder; value: string }) => {
		app.setOrderField(data.field, data.value);
	}
);


events.on('formErrors:change', (errors: IFormErrors) => {
	const { payment, address, email, phone } = errors;
	paymentAddress.valid = !payment && !address;
	contacts.valid = !email && !phone;

	paymentAddress.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join(' ');

	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join(' ');
});

events.on('order:submit', () => {
	const valid = !app.formErrors.email && !app.formErrors.phone;

	modal.render({
		content: contacts.render({
			valid,
			errors: [],
		}),
	});
});

events.on('contacts:submit', () => {
	const order: IOrder = {
		...(app.order as IContactsOrder),
		items: app.getBasketItems().map((item) => item.id),
		total: app.getTotalPrice(),
	};

	api
		.postOrder(order)
		.then((result) => {
			modal.render({ content: success.render({ total: result.total }) });
			app.clearBasket();
			app.clearOrder();
			paymentAddress.clearForm();
			contacts.clearForm();
			app.validateOrder();
		})
		.catch((err) => console.log(err));
});


events.on('popup:open', () => {
	page.locked = true;
});

events.on('popup:close', () => {
	page.locked = false;
});
