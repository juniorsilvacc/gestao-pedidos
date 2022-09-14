import { AppError } from '../../../../shared/errors/app-error';
import { InMemoryStorageProviderImplementations } from '../../../../shared/providers/storage/in-memory/in-memory-storage-provider';
import { InMemoryUsersImplementations } from '../../repositories/in-memory/in-memory-users-implementations';
import { UploadAvatarUserUseCase } from './upload-avatar-user-usecase';

let inMemoryUsersImplementations: InMemoryUsersImplementations;
let inMemoryStorageProvider: InMemoryStorageProviderImplementations;
let uploadAvatarUserUseCase: UploadAvatarUserUseCase;

describe('Upload Avatar', () => {
  beforeEach(() => {
    inMemoryUsersImplementations = new InMemoryUsersImplementations();
    inMemoryStorageProvider = new InMemoryStorageProviderImplementations();
    uploadAvatarUserUseCase = new UploadAvatarUserUseCase(
      inMemoryUsersImplementations,
      inMemoryStorageProvider,
    );
  });

  it('should upload avatar', async () => {
    const user = await inMemoryUsersImplementations.create({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    await uploadAvatarUserUseCase.execute({
      user_id: user.id,
      image: 'avatar.png',
    });

    expect(user.avatar).toBe('avatar.png');
  });

  it('should not be able to upload avatar from non existing user', async () => {
    await expect(
      uploadAvatarUserUseCase.execute({
        user_id: 'non-existing',
        image: 'avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(inMemoryStorageProvider, 'deleteFile');

    const user = await inMemoryUsersImplementations.create({
      name: 'Júnior Silva',
      email: 'junior@hotmail.com',
      cpf: '11122233345',
      password: '123456',
    });

    await uploadAvatarUserUseCase.execute({
      user_id: user.id,
      image: 'avatar.png',
    });

    await uploadAvatarUserUseCase.execute({
      user_id: user.id,
      image: 'avatar2.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.png');

    expect(user.avatar).toBe('avatar2.png');
  });
});
