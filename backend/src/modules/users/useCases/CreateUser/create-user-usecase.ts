import { AppError } from '../../../../shared/errors/app-error';
import { IBcryptProvider } from '../../../../shared/providers/bcrypt/bcrypt-provider';
import { IMailProvider } from '../../../../shared/providers/mail/mail-provider';
import { ICreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../models/user';
import { IUsersRepository } from '../../repositories/users-repository';
import mailConfig from '../../../../config/mail';
import { MailProviderImplementations } from '../../../../shared/providers/mail/implementations/mail-provider-implementations';
import { SESMailProviderImplementations } from '../../../../shared/providers/mail/implementations/ses-mail-provider-implementations';

class CreateUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly bcryptProvider: IBcryptProvider,
    private readonly mailProvider: IMailProvider,
  ) {
    if (mailConfig.driver === 'ethereal') {
      this.mailProvider = new MailProviderImplementations();
    } else {
      this.mailProvider = new SESMailProviderImplementations();
    }
  }

  async execute({ name, email, cpf, password }: ICreateUserDTO): Promise<User> {
    const emailExits = await this.usersRepository.findByEmail(email);
    const cpfExists = await this.usersRepository.findByCPF(cpf);

    if (emailExits || cpfExists) {
      throw new AppError('Esse usuário já existe');
    }

    const passwordHash = await this.bcryptProvider.generateHash(password);

    const newUser = await this.usersRepository.create({
      name,
      email,
      cpf,
      password: passwordHash,
    });

    await this.mailProvider.sendMail({
      to: {
        name,
        email,
      },
      from: {
        name: 'Equipe Administração e Gestão de Pedidos',
        email: 'fastservice@app.com',
      },
      subject: 'Cadastro Concluído - FAST SERVICE',
      body: [
        `<div style="text-align: center">`,
        `<h1>FeedBack</h1>`,
        `<p>Bem vindo a equipe <b>${name}</b>, Sua conta para o aplicativo gestão de pedidos foi criada com sucesso. Obrigado!</p>`,
        `</div>`,
      ].join(''),
    });

    return newUser;
  }
}

export { CreateUserUseCase };
