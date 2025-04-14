import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  criar(@Body() dados: CreateUsuarioDto) {
    return this.usuarioService.criar(dados);
  }

  @Get()
  listar() {
    return this.usuarioService.listarTodos();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.usuarioService.buscarPorId(id);
  } 
}
