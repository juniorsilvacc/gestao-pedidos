import { container } from 'tsyringe';
import { IStorageProvider } from './models/storage-provider';
import { DiskStorageProviderImplementations } from './implementations/disk-storage-provider-implementations';
import { S3StorageProviderImplementations } from './implementations/s3-storage-provider-implementations';

const providers = {
  local: DiskStorageProviderImplementations,
  s3: S3StorageProviderImplementations,
};

// container.registerSingleton<IStorageProvider>(
//   'StorageProvider',
//   providers[process.env.STORAGE_DRIVER],
// );
