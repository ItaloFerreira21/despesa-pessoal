import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
@Injectable()
export class CategoriasService {
  constructor(private prisma: PrismaService) {}

  async criarCategoria(nome: string, userId: string) {
    console.log(Object.keys(this.prisma));

    return this.prisma.categoria.create({
      data: {
        nome,
        usuarioId: userId,
      },
    });
    
  }

  async listarCategoriasDoUsuario(userId: string) {
    return this.prisma.categoria.findMany({
      where: { usuarioId: userId },
    });
  }

  async deletarCategoria(id: number, userId: string) {
    // Garante que a categoria pertence ao usuário
    const categoria = await this.prisma.categoria.findUnique({
      where: { id },
    });

    if (!categoria || categoria.usuarioId !== userId) {
      throw new ForbiddenException('Acesso negado');
    }

    return this.prisma.categoria.delete({ where: { id } });
  }
}

