// src/categorias/categorias.controller.ts
import { Controller, Post, Body, Get, Delete, Param, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoriasService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';

@ApiBearerAuth('access-token')
@ApiTags('categorias')
@UseGuards(JwtAuthGuard)
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  async criar(@Body() body: CreateCategoriaDto, @Request() req) {
    const userId = req.user.id;
    return this.categoriasService.criarCategoria(body.nome, userId);
  }

  @Get()
  async listar(@Request() req) {
    const userId = req.user.id;
    return this.categoriasService.listarCategoriasDoUsuario(userId);
  }

  @Delete(':id')
  async remover(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id;
    return this.categoriasService.deletarCategoria(id, userId);
  }
}