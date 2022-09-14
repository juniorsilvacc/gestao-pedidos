import { AppError } from '../../../../shared/errors/app-error';
import { IStorageProvider } from '../../../../shared/providers/storage/storage-provider';
import { User } from '../../models/user';
import { IUsersRepository } from '../../repositories/users-repository';

interface IRequest {
  user_id: string;
  image: string;
}

class UploadAvatarUserUseCase {
  constructor(
    private readonly usersRepository: IUsersRepository,
    private readonly storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, image }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError(
        'Somente usuários autenticados podem alterar o avatar',
        401,
      );
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(image);

    user.avatar = filename;

    return await this.usersRepository.save(user);
  }
}

export { UploadAvatarUserUseCase };
