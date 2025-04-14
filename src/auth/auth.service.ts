// src/auth/auth.service.ts
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async cadastrar(nome: string, email: string, senha: string) {
    const usuarioExistente = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      throw new BadRequestException('Usuário já cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);
  
    const usuario = await this.prisma.usuario.create({
      data: { nome, email, senha: senhaHash },
    });
  
    return { id: usuario.id, email: usuario.email };
  }
  
  async login(email: string, senha: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });
  
    console.log('Usuário encontrado:', usuario); // Verificando se o usuário foi encontrado
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      console.log('Credenciais inválidas');
      throw new UnauthorizedException('Credenciais inválidas');
    }
  
    const payload = { sub: usuario.id, email: usuario.email };
    const token = await this.jwtService.signAsync(payload);
    console.log('Token gerado:', token); // Verificando o token gerado
    return { access_token: token };
  }
  
}  
