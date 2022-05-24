export interface IUserRepository {
  getUserIdByUsername: (username: string) => Promise<string | null>;
  getStatsByUserId: (stats: string) => Promise<string>;
}
