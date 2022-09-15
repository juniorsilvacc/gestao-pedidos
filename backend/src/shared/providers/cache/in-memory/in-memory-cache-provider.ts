import { ICacheProvider } from '../cache-provider';

interface ICacheData {
  [key: string]: string;
}

class InMemoryCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  async recover<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  async invalidate(key: string): Promise<void> {
    delete this.cache[key];
  }
}

export { InMemoryCacheProvider };
