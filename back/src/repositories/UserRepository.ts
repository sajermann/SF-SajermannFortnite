import api from '../api';
import { IUserRepository } from './IUserRepository';

export class UserRepository implements IUserRepository {
  constructor() {}
  async getUserIdByUsername(username: string): Promise<string | null> {
    const { data } = await api.get(`/lookup?username=${encodeURI(username)}`, {
      headers: {
        strict: false,
      },
    });
    if (data.result) {
      return data.account_id;
    }
    return null;
  }

  async getStatsByUserId(userId: string) {
    const { data } = await api.get(`stats?account=${userId}`, {
      headers: {
        strict: false,
      },
    });
    return data;
  }
}
