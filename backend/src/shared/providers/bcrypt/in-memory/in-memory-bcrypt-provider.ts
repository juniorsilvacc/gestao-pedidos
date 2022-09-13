import { IBcryptProvider } from '../bcrypt-provider';

class InMemoryBcryptProviderImplementations implements IBcryptProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}

export { InMemoryBcryptProviderImplementations };
