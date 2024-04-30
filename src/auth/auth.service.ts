import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = this.configService.get<number>(
      'JWT_EXPIRATION_TIME',
    );
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.userService.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expireIn: this.jwtExpirationTimeInSeconds };
  }
}
