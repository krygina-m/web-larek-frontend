import { IModel } from '../../types/base/IModel';
import { IEventEmitter } from '../../types/base/IEventEmitter';

export abstract class Model<T> implements IModel {
	constructor(data: Partial<T>, protected events: IEventEmitter) {
		Object.assign(this, data);
	}

	emitChanges(event: string, payload?: object): void {
		this.events.emit(event, payload ?? {});
	}
}
