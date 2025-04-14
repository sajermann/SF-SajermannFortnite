import { promises } from 'fs';
import { join, resolve } from 'path';
import { IDevServices } from './IDevServices';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export class DevServices implements IDevServices {
  private async getPackageData(): Promise<{
    version: string;
    lastUpdate: string;
  } | null> {
    try {
      const filePath = IS_DEVELOPMENT
        ? resolve(__dirname, '../../package.json')
        : resolve(process.cwd(), 'package.json');
      // const filePath = resolve(process.cwd(), 'package.json');
      console.log({ filePath });
      // return IS_DEVELOPMENT
      //   ? require(filePath)
      //   : JSON.parse(await promises.readFile(filePath, 'utf-8'));
      return JSON.parse(await promises.readFile(filePath, 'utf-8'));
    } catch (error) {
      console.error('Error to read package.json:', error);
      return null;
    }
  }

  async getVersion() {
    const packageData = await this.getPackageData();
    return packageData
      ? {
          version: packageData.version,
          lastUpdate: packageData.lastUpdate,
        }
      : null;
  }
}
