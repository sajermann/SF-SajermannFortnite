export interface IDevServices {
	getVersion: () => Promise<object | null>;
}
