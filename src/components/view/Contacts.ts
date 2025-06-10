import { IEventEmitter } from '../../types/base/IEventEmitter';//это эмиттер
import { IContactsView } from '../../types/view/IContacts';
import { IContactsOrder }  from '../../types/model/IData';
import { FormView } from './Form';

export class ContactsView
	extends FormView<IContactsOrder>
	implements IContactsView
{
	constructor(container: HTMLFormElement, events: IEventEmitter) {
		super(container, events);
	}

	set email(email: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			email;
	}

	set phone(phone: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			phone;
	}
}
