import { container } from 'tsyringe';
import { MailProviderImplementations } from './implementations/mail-provider-implementations';
import { SESMailProviderImplementations } from './implementations/ses-mail-provider-implementations';
import { IMailProvider } from './models/mail-provider';
import mailConfig from '../../../config/mail';

const providers = {
  ethereal: MailProviderImplementations,
  ses: SESMailProviderImplementations,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver],
);
