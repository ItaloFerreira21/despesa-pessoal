// src/relatorios/relatorios.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RelatorioFiltroDto } from './dto/relatorio-filtro.dto';

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async gerarRelatorioMensal(userId: string, filtro: RelatorioFiltroDto) {
    const { dataInicio, dataFim } = filtro;

    const despesas = await this.prisma.despesa.findMany({
      where: {
        usuarioId: userId,
        data: {
          ...(dataInicio && { gte: new Date(dataInicio) }),
          ...(dataFim && { lte: new Date(dataFim) }),
        },
      },
      orderBy: { data: 'asc' },
    });

    const total = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);

    return {
      total,
      quantidade: despesas.length,
      despesas,
    };
  }

  async gerarRelatorioTotal(userId: string) {
    const despesas = await this.prisma.despesa.findMany({
      where: { usuarioId: userId },
    });

    const total = despesas.reduce((acc, despesa) => acc + despesa.valor, 0);

    return {
      total,
      quantidade: despesas.length,
    };
  }
}
