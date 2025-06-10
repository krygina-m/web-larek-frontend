import { IEventEmitter } from '../base/IEventEmitter';
import { IContactsOrder } from '../model/IData';

export type IPaymentAddressData = IContactsOrder;

export interface IPaymentAddressViewConstructor {
	new (container: HTMLFormElement, events: IEventEmitter): IPaymentAddressView;
}

export interface IPaymentAddressView {
	set payment(payment: string);
	set address(address: string);
	clearForm(): void;
}
