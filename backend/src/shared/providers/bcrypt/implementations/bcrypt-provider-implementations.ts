import { compare, hash } from 'bcrypt';
import { IBcryptProvider } from '../bcrypt-provider';

class BcrypyProviderImplementations implements IBcryptProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export { BcrypyProviderImplementations };
