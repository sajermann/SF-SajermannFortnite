import { IUserRepository } from "./IUserRepository";
import api from "../api";

export class UserRepository implements IUserRepository {
  constructor(){}
  async getIdByUsername(username: string) {
    const result = await api.get(`/lookup?username=${encodeURI(username)}`, {
      headers:{
        strict: false
      }
    })
    console.log('Linha 8', result)
    console.log(username)
    return "";
  }
}