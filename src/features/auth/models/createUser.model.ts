import { User } from '../../../libs/typeorm/entities/user.entity';

export class CreateUserModel {
  id: string;
  email: string;
  name: string;
  constructor(user: User) {
    this.id = user.id.toString();
    this.email = user.email.address;
    this.name = user.profile.name;
  }
}
