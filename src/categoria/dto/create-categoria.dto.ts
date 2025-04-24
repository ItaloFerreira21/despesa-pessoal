import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Alimentação' })
  @IsString()
  @Length(2, 50)
  nome: string;
}
