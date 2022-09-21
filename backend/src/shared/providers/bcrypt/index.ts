import { container } from 'tsyringe';
import { IBcryptProvider } from './models/bcrypt-provider';
import { BcrypyProviderImplementations } from './implementations/bcrypt-provider-implementations';

container.registerSingleton<IBcryptProvider>(
  'BcryptProvider',
  BcrypyProviderImplementations,
);
