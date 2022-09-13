import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../../config/upload';
import { IStorageProvider } from '../storage-provider';

class DisksStorageProviderImplementations implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      // pegar informações do arquivo
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    // Se encontrou
    await fs.promises.unlink(filePath);
  }
}

export { DisksStorageProviderImplementations };
