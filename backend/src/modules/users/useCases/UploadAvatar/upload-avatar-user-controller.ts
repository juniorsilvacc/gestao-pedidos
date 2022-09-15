import { Request, Response } from 'express';
import { AppError } from '../../../../shared/errors/app-error';
import { DiskStorageProviderImplementations } from '../../../../shared/providers/storage/implementations/disk-storage-provider-implementations';
import { PostgresUsersImplementations } from '../../repositories/implementations/postgres-users-implementations';
import { UploadAvatarUserUseCase } from './upload-avatar-user-usecase';
import { instanceToInstance } from 'class-transformer';

class UploadAvatarUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const usersImplementations = new PostgresUsersImplementations();
    const diskStorageProviderImplementations =
      new DiskStorageProviderImplementations();
    const uploadAvatarUserUseCase = new UploadAvatarUserUseCase(
      usersImplementations,
      diskStorageProviderImplementations,
    );

    if (!request.file) {
      throw new AppError('Error: upload image');
    } else {
      const { filename: image } = request.file;

      const user = await uploadAvatarUserUseCase.execute({
        user_id,
        image,
      });

      return response.status(200).json(instanceToInstance(user));
    }
  }
}

export { UploadAvatarUserController };
