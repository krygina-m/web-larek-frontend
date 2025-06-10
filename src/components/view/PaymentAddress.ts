import { ensureAllElements } from '../../utils/utils';
import { IEventEmitter } from '../../types/base/IEventEmitter';
import { IContactsOrder }  from '../../types/model/IData';
import { IPaymentAddressView } from '../../types/view/IPaymentAddress';
import { FormView } from './Form';

export class PaymentAddressView
	extends FormView<IContactsOrder>
	implements IPaymentAddressView
{
	protected _paymentButtons: HTMLButtonElement[];

	constructor(container: HTMLFormElement, events: IEventEmitter) {
		super(container, events);

		this._paymentButtons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);

		this._paymentButtons.forEach((button) => {
			button.addEventListener('click', () => {
				this.payment = button.name;
				this.onInputChange('payment', button.name);
			});
		});
	}

	set payment(payment: string) {
		this._paymentButtons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === payment);
		});
	}

	set address(address: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			address;
	}

	clearForm(): void {
		super.clearForm();
		this.payment = '';
	}
}
