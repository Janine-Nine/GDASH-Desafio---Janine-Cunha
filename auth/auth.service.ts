import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService) {}

  login(payload: any) {
    // payload should contain at least { sub: userId, email }
    const token = this.jwt.sign(payload);
    return { access_token: token };
  }
}