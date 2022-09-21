import { container } from 'tsyringe';
import { ICacheProvider } from './models/cache-provider';
import { RedisCacheProviderImplementations } from './implementations/redis-cache-provider-implementations';

container.registerSingleton<ICacheProvider>(
  'CacheProvider',
  RedisCacheProviderImplementations,
);
