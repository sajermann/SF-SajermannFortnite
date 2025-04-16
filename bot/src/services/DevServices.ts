import { promises } from 'fs';
import { resolve } from 'path';
import { formatDateAndHour } from '../utils/formatDate';
const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export class DevServices {
  private static async getPackageData(): Promise<{
    version: string;
    lastUpdate: string;
  } | null> {
    try {
      const filePath = IS_DEVELOPMENT
        ? resolve(__dirname, '../../package.json')
        : resolve(process.cwd(), 'package.json');
      return JSON.parse(await promises.readFile(filePath, 'utf-8'));
    } catch (error) {
      console.error('Error to read package.json:', error);
      return null;
    }
  }

  static async getVersion() {
    const packageData = await this.getPackageData();
    if (!packageData) return null;
    const config = {
      version: packageData.version,
      updatedAt: formatDateAndHour(new Date(packageData.lastUpdate)),
      ambient: IS_DEVELOPMENT ? 'Development' : 'Production',
    };

    return {
      ...config,
      message: `Version: ${config.version} \nLast Update: ${config.updatedAt} \nAmbient: ${config.ambient}`,
    };
  }
}
