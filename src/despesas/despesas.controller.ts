import { Controller, Post, Body, Request, UseGuards, Get, Query, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FiltroDespesaDto } from './dto/filtro-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('despesas')
@ApiBearerAuth('access-token') // <<< mesmo nome usado no main.ts
@Controller('despesas')
export class DespesaController {
  constructor(private readonly despesaService: DespesasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async criarDespesa(
    @Body() body: CreateDespesaDto,
    @Request() req
  ) {
    const userId = req.user.id; // JWT guarda o ID como 'id'
    console.log(' ID do usuário:', userId);
    return this.despesaService.criarDespesa(body.titulo, body.valor, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listarDespesas(@Request() req,
    @Query() filtro: FiltroDespesaDto
  ) {
    const userId = req.user.id;
    return this.despesaService.listarDespesasDoUsuario(userId, filtro);
  }

  @UseGuards(JwtAuthGuard)
@Patch(':id')
async atualizarDespesa(
  @Param('id', ParseIntPipe) id: number,
  @Body() body: UpdateDespesaDto,
  @Request() req
) {
  const userId = req.user.id;
  return this.despesaService.atualizarDespesa(id, userId, body);
}

@UseGuards(JwtAuthGuard)
@Delete(':id')
async deletarDespesa(
  @Param('id', ParseIntPipe) id: number,
  @Request() req
) {
  const userId = req.user.id;
  return this.despesaService.deletarDespesa(id, userId);
  }
}
