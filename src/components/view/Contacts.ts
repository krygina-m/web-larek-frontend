import { IEventEmitter } from '../../types/base/IEventEmitter';//это эмиттер
import { IContactsData, IContactsView } from '../../types/view/IContacts';
import { FormView } from './Form';

export class ContactsView
	extends FormView<IContactsData>
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
