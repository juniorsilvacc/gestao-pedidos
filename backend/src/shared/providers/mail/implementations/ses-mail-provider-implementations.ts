import { IMailProvider, IMessage } from '../mail-provider';
import aws from 'aws-sdk';
import nodemailer, { Transporter } from 'nodemailer';

class SESMailProviderImplementations implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.client.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}

export { SESMailProviderImplementations };
