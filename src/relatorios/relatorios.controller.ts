// src/relatorios/relatorios.controller.ts
import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RelatoriosService } from './relatorios.service';
import { RelatorioFiltroDto } from './dto/relatorio-filtro.dto';

@ApiBearerAuth('access-token')
@ApiTags('relatorios')
@UseGuards(JwtAuthGuard)
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('mensal')
  async relatorioMensal(@Query() filtro: RelatorioFiltroDto, @Request() req) {
    const userId = req.user.id;
    return this.relatoriosService.gerarRelatorioMensal(userId, filtro);
  }

  @Get('total')
  async relatorioTotal(@Request() req) {
    const userId = req.user.id;
    return this.relatoriosService.gerarRelatorioTotal(userId);
  }
}
