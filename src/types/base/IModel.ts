export interface IModel {
	emitChanges(event: string, payload?: object): void;
}
