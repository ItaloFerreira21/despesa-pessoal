import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'italo.novo@email.com' })
  email: string;

  @ApiProperty({ example: 'senhaSegura123' })
  senha: string;
}
