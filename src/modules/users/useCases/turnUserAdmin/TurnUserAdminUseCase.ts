import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

class TurnUserAdminUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User {
    const user = this.usersRepository.findById(user_id);
    const isAdmin = user.admin;

    if (user && !isAdmin) {
      this.usersRepository.turnAdmin(user);
      return user;
    }
    throw new Error('Inexistent user, or user is already an admin!');
  }
}

export { TurnUserAdminUseCase };
