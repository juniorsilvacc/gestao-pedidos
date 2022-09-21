import { IMailProvider, IMessage } from '../models/mail-provider';

class InMemoryMailProviderImplementations implements IMailProvider {
  private messages: IMessage[] = [];

  async sendMail(message: IMessage): Promise<void> {
    this.messages.push(message);
  }
}

export { InMemoryMailProviderImplementations };
