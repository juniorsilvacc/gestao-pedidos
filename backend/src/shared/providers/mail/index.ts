import mailConfig from '../../../config/mail';
import { MailProviderImplementations } from './implementations/mail-provider-implementations';
import { SESMailProviderImplementations } from './implementations/ses-mail-provider-implementations';

export default {
  configuration:
    mailConfig.driver === 'ethereal'
      ? MailProviderImplementations
      : SESMailProviderImplementations,
};
