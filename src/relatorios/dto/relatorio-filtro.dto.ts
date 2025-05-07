// src/relatorios/dto/relatorio-filtro.dto.ts
import { IsOptional, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RelatorioFiltroDto {
  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2025-05-01',
    description: 'Data inicial do período',
  })
  dataInicio?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional({
    example: '2025-05-31',
    description: 'Data final do período',
  })
  dataFim?: string;
}
