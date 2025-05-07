import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto, type UpdateUsuarioDto } from './dto/usuario.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  criar(@Body() dados: CreateUsuarioDto) {
    return this.usuarioService.criar(dados);
  }

  @Get()
  @ApiOperation({ summary: 'Listar usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
  })
  listar() {
    return this.usuarioService.listarTodos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar usuário por id' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  buscar(@Param('id') id: string) {
    return this.usuarioService.buscarPorId(id);
  }
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiParam({ name: 'id', description: 'ID do usuário (UUID)', type: 'string' })
  atualizar(@Param('id') id: string, @Body() dados: UpdateUsuarioDto) {
    return this.usuarioService.atualizar(id, dados);
  }
}
