// src/despesas/dto/create-despesa.dto.ts
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDespesaDto {
  @ApiProperty({ example: 'Supermercado' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 120.5 })
  @IsNumber()
  valor: number;
}
