// src/despesas/despesas.module.ts
import { Module } from '@nestjs/common';
import { DespesasService } from './despesas.service';
import { PrismaService } from '../prisma/prisma.service';
import { DespesaController } from './despesas.controller';

@Module({
  controllers: [ DespesaController],
  providers: [DespesasService, PrismaService],
})
export class DespesasModule {}
