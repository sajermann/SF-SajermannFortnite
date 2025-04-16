import NodeCache from 'node-cache';
import { UserRepository } from '../repositories/UserRepository';
import { IUserServices } from './IUserServices';
const myCache = new NodeCache();
const userRepository = new UserRepository();

export class UserServices implements IUserServices {
  constructor() {}
  async getStats(username: string): Promise<object | null> {
    let userId = myCache.get(username) as string | null;
    if (!userId) {
      console.log('UserId not cached');
      userId = await userRepository.getUserIdByUsername(username);
      if (userId) {
        console.log('UserId', userId);
        myCache.set(username, userId, 10000);
      } else {
        console.log('UserId not found');
        return null;
      }
    }
    const result = await userRepository.getStatsByUserId(userId);
    return result;
  }
}
