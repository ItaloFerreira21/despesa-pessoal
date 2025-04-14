import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class FiltroDespesaDto {
  @ApiPropertyOptional({ example: 50, description: 'Valor mínimo da despesa' })
  @IsOptional()
  @Type(() => Number) // conversão aqui!
  @IsNumber()
  valorMin?: number;

  @ApiPropertyOptional({ example: 300, description: 'Valor máximo da despesa' })
  @IsOptional()
  @Type(() => Number) // conversão aqui!
  @IsNumber()
  valorMax?: number;

  @ApiPropertyOptional({ example: '2025-04-01', description: 'Data de início (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiPropertyOptional({ example: '2025-04-30', description: 'Data de fim (YYYY-MM-DD)' })
  @IsOptional()
  @IsDateString()
  dataFim?: string;
}
