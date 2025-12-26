import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private svc: AuthService) {}

  @Post('login')
  async login(@Body() body: any) {
    // Na prática valide user/pw. Aqui simplificamos.
    const user = { sub: body.email, email: body.email, role: 'user' };
    return this.svc.login(user);
  }
}