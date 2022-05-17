import { IUserServices } from "./IUserServices";
import { UserRepository } from "../repositories/UserRepository";

export class UserServices implements IUserServices {
  constructor() {}
  async getStats(username: string) {
    const userRepository = new UserRepository();
    const result = await userRepository.getIdByUsername(username)
    return result;
  }
}
