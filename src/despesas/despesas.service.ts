// src/despesas/despesas.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FiltroDespesaDto } from './dto/filtro-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Injectable()
export class DespesasService {
  constructor(private prisma: PrismaService) {}

  async criarDespesa(titulo: string, valor: number, userId: string) {
    return this.prisma.despesa.create({
      data: {
        titulo,
        valor,
        usuario: {
          connect: { id: userId },
        },
      },
    });
  }

  // listar despesas do usuário
  async listarDespesasDoUsuario(userId: string, filtro: FiltroDespesaDto) {
    const { valorMin, valorMax, dataInicio, dataFim } = filtro;

    return this.prisma.despesa.findMany({
      where: {
        usuarioId: userId,
        valor: {
          ...(valorMin !== undefined && { gte: valorMin }),
          ...(valorMax !== undefined && { lte: valorMax }),
        },
        data: {
          ...(dataInicio && { gte: new Date(dataInicio) }),
          ...(dataFim && { lte: new Date(dataFim) }),
        },
      },
    });
  }

  // atualizar despesa
  async atualizarDespesa(id: number, userId: string, data: UpdateDespesaDto) {
    // Verifica se a despesa pertence ao usuário
    const despesa = await this.prisma.despesa.findFirst({
      where: { id, usuarioId: userId },
    });
  
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }
  
    return this.prisma.despesa.update({
      where: { id },
      data,
    });
  }

  async deletarDespesa(id: number, userId: string) {
    const despesa = await this.prisma.despesa.findFirst({
      where: { id, usuarioId: userId },
    });
  
    if (!despesa) {
      throw new NotFoundException('Despesa não encontrada');
    }
  
    return this.prisma.despesa.delete({
      where: { id },
    });
    return { message: 'Despesa deletada com sucesso' };
  }  
}