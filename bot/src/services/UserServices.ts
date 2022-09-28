/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import NodeCache from 'node-cache';
import nodeHtmlToImage from 'node-html-to-image';
import DiscordJs, { BufferResolvable } from 'discord.js';
import { IUserServices } from './IUserServices';
import { UserRepository } from '../repositories/UserRepository';

const myCache = new NodeCache();

export class UserServices implements IUserServices {
	async getStats(
		username: string,
		platform: string,
		templateHtml: string
	): Promise<DiscordJs.MessageAttachment | null> {
		const userRepository = new UserRepository();
		let userId = myCache.get(`${username}-${platform}`) as string | null;
		if (!userId) {
			console.log('UserId não Cacheado');
			userId = await userRepository.getUserIdByUsername(username, platform);
			if (userId) {
				console.log('UserId', userId);
				myCache.set(`${username}-${platform}`, userId, 10000);
			} else {
				console.log('UserId não encontrado');
				return null;
			}
		}
		const result = await userRepository.getStatsByUserId(userId);

		const bufferHtml = (await nodeHtmlToImage({
			html: templateHtml,
			content: {
				gamer: username,
				level: result.account.level,
				kdSolo: String(result.global_stats.solo?.kd || 0),
				kdDuo: String(result.global_stats.duo?.kd || 0),
				kdTrio: String(result.global_stats.trio?.kd || 0),
				kdSquad: String(result.global_stats.squad?.kd || 0),

				killsSolo: String(result.global_stats.solo?.kills || 0),
				killsDuo: String(result.global_stats.duo?.kills || 0),
				killsTrio: String(result.global_stats.trio?.kills || 0),
				killsSquad: String(result.global_stats.squad?.kills || 0),

				matchesSolo: String(result.global_stats.solo?.matchesplayed || 0),
				matchesDuo: String(result.global_stats.duo?.matchesplayed || 0),
				matchesTrio: String(result.global_stats.trio?.matchesplayed || 0),
				matchesSquad: String(result.global_stats.squad?.matchesplayed || 0),

				top1Solo: String(result.global_stats.solo?.placetop1 || 0),
				top1Duo: String(result.global_stats.duo?.placetop1 || 0),
				top1Trio: String(result.global_stats.trio?.placetop1 || 0),
				top1Squad: String(result.global_stats.squad?.placetop1 || 0),

				top10Solo: String(result.global_stats.solo?.placetop10 || 0),
				top10Duo: String(result.global_stats.duo?.placetop10 || 0),
				top10Trio: String(result.global_stats.trio?.placetop10 || 0),
				top10Squad: String(result.global_stats.squad?.placetop10 || 0),

				top25Solo: String(result.global_stats.solo?.placetop25 || 0),
				top25Duo: String(result.global_stats.duo?.placetop25 || 0),
				top25Trio: String(result.global_stats.trio?.placetop25 || 0),
				top25Squad: String(result.global_stats.squad?.placetop25 || 0),

				minutesSolo: String(result.global_stats.solo?.minutesplayed || 0),
				minutesDuo: String(result.global_stats.duo?.minutesplayed || 0),
				minutesTrio: String(result.global_stats.trio?.minutesplayed || 0),
				minutesSquad: String(result.global_stats.squad?.minutesplayed || 0),
			},
			puppeteerArgs: {
				args: ['--no-sandbox', '--disable-setuid-sandbox'],
			}

		})) as Buffer[];

		const sfattach = new DiscordJs.MessageAttachment(
			bufferHtml as unknown as BufferResolvable,
			'output.png'
		);

		return sfattach;
	}
}
