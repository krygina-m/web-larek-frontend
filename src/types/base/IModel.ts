import { IEventEmitter } from './IEventEmitter';

export interface IModelConstructor<T> {
	new (data: Partial<T>, events: IEventEmitter): IModel;
}

export interface IModel {
	emitChanges(event: string, payload?: object): void;
}
