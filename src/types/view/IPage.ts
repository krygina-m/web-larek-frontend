import { IEventEmitter } from '../base/IEventEmitter';

export interface IPageData {
	basketCounter: number;
	productList: HTMLElement[];
	locked: boolean;
}

export interface IPageViewConstructor {
	new (container: HTMLElement, events: IEventEmitter): IPageView;
}

export interface IPageView {
	set basketCounter(value: number);
	set productsList(items: HTMLElement[]);
	set locked(state: boolean);
}
