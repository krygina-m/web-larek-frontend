import { IEventEmitter } from '../base/IEventEmitter';

export interface IContactsViewConstructor {
	new (container: HTMLFormElement, events: IEventEmitter): IContactsView;
}

export interface IContactsView {
	set email(email: string);
	set phone(phone: string);
}
