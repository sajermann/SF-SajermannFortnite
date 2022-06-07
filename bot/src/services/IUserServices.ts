export interface IUserServices {
  getStats: (data: string, platform: string) => Promise<object | null>;
}
