import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
export class CreateUsuarioDto {
  nome: string;
  email: string;
  senha: string;
}

export class UpdateUsuarioDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'João Silva',
    required: false,
  })
  nome?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao@email.com',
    required: false,
  })
  email?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @ApiProperty({
    description: 'Senha do usuário (mínimo 6 caracteres)',
    example: 'senha123',
    required: false,
    minLength: 6,
  })
  senha?: string;
}
