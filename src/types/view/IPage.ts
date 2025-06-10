export interface IPageData {
	basketCounter: number;
	productList: HTMLElement[];
	locked: boolean;
}

export interface IPageView {
	set basketCounter(value: number);
	set productsList(items: HTMLElement[]);
	set locked(state: boolean);
}
