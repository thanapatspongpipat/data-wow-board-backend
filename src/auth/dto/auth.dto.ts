import { Injectable } from '@nestjs/common';
import { IsEmail, IsNotEmpty } from 'class-validator';

@Injectable()
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
