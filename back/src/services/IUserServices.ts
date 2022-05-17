export interface IUserServices {
  getStats: (data: string) => Promise<string>;
}
