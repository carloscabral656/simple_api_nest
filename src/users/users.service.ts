import { Injectable } from '@nestjs/common';
import { UserDto } from './users.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [
    {
      id: '1',
      username: 'carlos',
      password: '1234',
    },
  ];

  create(newUser: UserDto) {
    newUser.id = uuid();
    newUser.password = hashSync(newUser.password, 10);
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find((u) => {
      u.username === username;
    });
  }
}
