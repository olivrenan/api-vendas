import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';
import uploadConfig from '@config/upload';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      const s3StorageProvider = new S3StorageProvider();

      if (user.avatar) {
        await s3StorageProvider.deleteFile(user.avatar);
      }

      const filename = await s3StorageProvider.saveFile(avatarFilename);
      user.avatar = filename;
    } else {
      const diskStorageProvider = new DiskStorageProvider();

      if (user.avatar) {
        await diskStorageProvider.deleteFile(user.avatar);
      }

      const filename = await diskStorageProvider.saveFile(avatarFilename);
      user.avatar = filename;
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
