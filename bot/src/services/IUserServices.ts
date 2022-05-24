export interface IUserServices {
  getStats: (data: string) => Promise<object | null>;
}
