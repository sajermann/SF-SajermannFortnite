export interface IUserServices {
	getStats: (
		data: string,
		platform: string,
		templateHtml: string
	) => Promise<object | null>;
}
