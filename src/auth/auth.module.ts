// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // importa o config
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Importando o ConfigModule para injeção
      useFactory: async (configService: ConfigService) => {
        // Adicionando console.log para verificar o valor da variável JWT_SECRET
        const jwtSecret = configService.get<string>('JWT_SECRET');
        console.log('JWT_SECRET no AuthModule:', jwtSecret);  // Verificando a variável JWT_SECRET

        return {
          secret: jwtSecret,
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService], // Injeta o ConfigService para pegar o JWT_SECRET
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
