import { IStorageProvider } from '../models/storage-provider';

class S3StorageProviderImplementations implements IStorageProvider {
  saveFile(file: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  deleteFile(file: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export { S3StorageProviderImplementations };
