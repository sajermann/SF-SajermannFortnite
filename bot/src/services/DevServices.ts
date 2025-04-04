/* eslint-disable no-restricted-syntax */
/* eslint-disable class-methods-use-this */
import NodeCache from 'node-cache';
import { IDevServices } from './IDevServices';

const myCache = new NodeCache();

export class DevServices implements IDevServices {
	async getVersion(): Promise<{version: string, lastUpdate: string} | null> {
		try{
			const { version, lastUpdate } = require('../../package.json');
		
			return { version, lastUpdate }
		}catch(e){
			console.log(`err`, {e})
			return null
		}
		
	};

}
