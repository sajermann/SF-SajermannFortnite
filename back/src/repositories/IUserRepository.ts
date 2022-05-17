export interface IUserRepository {
  getIdByUsername: (data: string) => Promise<string>;
}
