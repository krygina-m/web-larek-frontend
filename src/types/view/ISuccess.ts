export interface ISuccessActions {
	onClick: (event: MouseEvent) => void;
}

export interface ISuccess {
	total: number;
}


export interface ISuccessView {
	set total(total: number);
}
