// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),  // Aqui já estamos usando o ConfigService para pegar o segredo
    });

    // Adicionando console.log para verificar o valor do JWT_SECRET na strategy
    console.log('JWT_SECRET na JwtStrategy:', configService.get<string>('JWT_SECRET'));  // Verificando a variável JWT_SECRET
  }

  async validate(payload: any) {
    console.log('Payload do JWT:', payload)
    return { id: payload.sub, email: payload.email };
  }
}
