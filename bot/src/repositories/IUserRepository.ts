export interface IUserRepository {
  getUserIdByUsername: (username: string, platform: string) => Promise<string | null>;
  getStatsByUserId: (stats: string) => Promise<string>;
}
