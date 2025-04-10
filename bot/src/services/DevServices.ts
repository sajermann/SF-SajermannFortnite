import { IDevServices } from './IDevServices';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const PATH_PACKAGE = IS_DEVELOPMENT
  ? '../../package.json'
  : '../../../package.json';

export class DevServices implements IDevServices {
  async getVersion(): Promise<{ version: string; lastUpdate: string } | null> {
    try {
      const { version, lastUpdate } = require(PATH_PACKAGE);

      return { version, lastUpdate };
    } catch (e) {
      console.log(`err`, { e });
      return null;
    }
  }
}
