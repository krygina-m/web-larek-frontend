export interface IEventEmitter {
	on<T extends object>(event: string, callback: (data: T) => void): void;
	emit<T extends object>(event: string, data?: T): void;
  off<T extends object>(event: string, callback: (data: T) => void): void;
	trigger<T extends object>(
		event: string,
		context?: Partial<T>
	): (data: T) => void;
}

export enum EventsList {
	'catalogModel:change',

	'card:select',
	
	'basketModel:add',
	'basketModel:remove',

	'preview:change',

	'basket:open',
	'backet:change',
	
	'formErrors:change',

	'order:open',
	'order:submit',

	'сontactsOrder.payment:change',
	'сontactsOrder.address:change',
	'сontactsOrder.email:change',
	'сontactsOrder.phone:change',
	
	'contacts:submit',


	'popup:open',
	'popup:close',
}
