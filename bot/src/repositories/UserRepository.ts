/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
import { IUserRepository } from './IUserRepository';
import api from '../api';

export class UserRepository implements IUserRepository {
	async getUserIdByUsername(
		username: string,
		platform: string
	): Promise<string | null> {
		console.log(`/lookup?username=${encodeURI(username)}&platform=${platform}`);
		const { data } = await api.get(
			`/lookup?username=${encodeURI(username)}&platform=${platform}`,
			{
				headers: {
					strict: false,
				},
			}
		);
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
