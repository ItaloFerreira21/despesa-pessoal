import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async criar(dados: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: dados,
    });
  }

  async listarTodos() {
    return this.prisma.usuario.findMany();
  }

  async buscarPorId(id: string) {
    return this.prisma.usuario.findUnique({
      where: { id },
    });
}
}