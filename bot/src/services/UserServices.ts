import { IUserServices } from "./IUserServices";
import { UserRepository } from "../repositories/UserRepository";
import NodeCache from "node-cache";
const myCache = new NodeCache();

export class UserServices implements IUserServices {
  constructor() {}
  async getStats(username: string): Promise<object | null>{
    const userRepository = new UserRepository();
    let userId = myCache.get(username) as string | null;
    if (!userId) {
      console.log("UserId não Cacheado");
      userId = await userRepository.getUserIdByUsername(username);
      console.log('UserId', userId)
      if (userId) {
        myCache.set(username, userId, 10000);
      } else {
        console.log("UserId não encontrado");
        return null;
      }
    }
    const result = await userRepository.getStatsByUserId(userId);
    return result;
  }
}
