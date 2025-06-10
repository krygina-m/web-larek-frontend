import { ensureElement } from '../../utils/utils'; //эта штука есть
import { IEventEmitter } from '../../types/base/IEventEmitter';//это эмиттер
import { IPopupData, IPopupView } from '../../types/view/IPopup';//это модалки. 1-я с хтмл, вторая с открыть/закрыть у меня IPopuр
import { View } from '../base/view';//это класс вьюхи!!! он переключает класс

export class ModalView extends View<IPopupData> implements IPopupView {
	protected _closeButton: HTMLButtonElement;
	protected _content: HTMLElement;

	constructor(container: HTMLElement, protected events: IEventEmitter) {
		super(container);

		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);

		this._content = ensureElement<HTMLElement>('.modal__content', container);
		this._closeButton.addEventListener('click', this.close.bind(this));
		this.container.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (evt) => evt.stopPropagation());
	}
	closeButton: HTMLButtonElement;

	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}

	open(): void {
		this.container.classList.add('modal_active');
		this.events.emit('popup:open');
	}

	close(): void {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('popup:close');
	}

	handleESC(evt: KeyboardEvent): void {
    if (evt.key === 'Escape') {
         this.close();
        };
  }

	render(data: IPopupData): HTMLElement {
		super.render(data);
		this.open();
		return this.container;
	}
}
