import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '../domain/repositories/IUserRepository';
import { IPaginateUser } from '../domain/models/IPaginateUser';

interface SearchParams {
  page: number;
  limit: number;
}

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ page, limit }: SearchParams): Promise<IPaginateUser> {
    const take = limit;
    const skip = (Number(page) - 1) * take;

    const users = this.usersRepository.findAll({
      page,
      skip,
      take,
    });

    return users;
  }
}

export default ListUserService;
