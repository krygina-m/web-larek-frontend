import { createElement, ensureElement } from '../../utils/utils';
import { IEventEmitter } from '../../types/base/IEventEmitter';//это эмиттер
import { IBasketData, IBasketView } from '../../types/view/IBasket';
import { View } from '../base/view';

export class BasketView extends View<IBasketData> implements IBasketView {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: IEventEmitter) {
		super(container);
		this._list = ensureElement<HTMLElement>('.basket__list', container);
		this._total = ensureElement<HTMLElement>('.basket__price', container);

		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			container
		);

		this._button.addEventListener('click', () => {
			this.events.emit('order:open');
		});

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
			this.setDisabled(this._button, false);
		} else {
			this._list.replaceChildren(
				createElement('p', { textContent: 'Корзина пуста' })
			);

			this.setDisabled(this._button, true);
		}
	}

	set total(total: number) {
		this.setTextContent(this._total, `${total} синапсов`);
	}
}
