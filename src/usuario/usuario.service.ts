import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto, type UpdateUsuarioDto } from './dto/usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async criar(dados: CreateUsuarioDto) {
    // Hash da senha antes de salvar
    const senhaHash = await this.hashSenha(dados.senha);

    return this.prisma.usuario.create({
      data: {
        ...dados,
        senha: senhaHash,
      },
    });
  }

  async listarTodos() {
    return this.prisma.usuario.findMany({
      include: {
        _count: {
          select: {
            despesas: true,
            categorias: true,
          },
        },
      },
    });
  }

  async buscarPorId(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      include: {
        despesas: true,
        categorias: true,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }

    return usuario;
  }

  async atualizar(id: string, dados: UpdateUsuarioDto) {
    await this.buscarPorId(id);

    const data: any = { ...dados };

    if (dados.senha) {
      data.senha = await this.hashSenha(dados.senha);
    }

    return this.prisma.usuario.update({
      where: { id },
      data,
      include: {
        _count: {
          select: {
            despesas: true,
            categorias: true,
          },
        },
      },
    });
  }

  private async hashSenha(senha: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(senha, salt);
  }
}
