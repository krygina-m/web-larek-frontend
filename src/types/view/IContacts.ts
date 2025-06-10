import { IEventEmitter } from '../base/IEventEmitter';
import { IContactsOrder } from '../model/IData';
export type IContactsData = IContactsOrder;

export interface IContactsViewConstructor {
	new (container: HTMLFormElement, events: IEventEmitter): IContactsView;
}

export interface IContactsView {
	set email(email: string);
	set phone(phone: string);
}
