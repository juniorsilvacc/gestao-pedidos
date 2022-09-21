import { container } from 'tsyringe';
import { IStorageProvider } from './models/storage-provider';
import { DiskStorageProviderImplementations } from './implementations/disk-storage-provider-implementations';
import { S3StorageProviderImplementations } from './implementations/s3-storage-provider-implementations';
import uploadConfig from '../../../config/upload';

const providers = {
  disk: DiskStorageProviderImplementations,
  s3: S3StorageProviderImplementations,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
