import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from './dto/auth.dto';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async signIn(authDto: AuthDto) {
    const user = await this.validateUser(authDto);
    const payload = {
      email: user.email,
    };

    return {
      user,
      tokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.jwtSecretKey,
        }),
      },
    };
  }

  async validateUser(authDto: AuthDto) {    
    const user = await this.userService.findUserByEmail(authDto.email);    
    if (!user) {
      const newUser = await this.userService.createUser(authDto);      
      return newUser
    }else{
      return user;
    }

    
  }
}
