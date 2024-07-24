// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user.toJSON();
      return result; // Ensure result includes the name
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name }; // Include name in the payload
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      }
    };
  }
}  