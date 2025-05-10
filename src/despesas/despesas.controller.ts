import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DespesasService } from './despesas.service';
import { CreateDespesaDto } from './dto/create-despesa.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FiltroDespesaDto } from './dto/filtro-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@Controller('despesas')
@ApiBearerAuth('access-token')
@Controller('despesas')
export class DespesaController {
  constructor(private readonly despesaService: DespesasService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'criar despesa' })
  @ApiResponse({ status: 201, description: 'Despesa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async criarDespesa(@Body() body: CreateDespesaDto, @Request() req) {
    const userId = req.user.id; // JWT guarda o ID como 'id'
    console.log(' ID do usuário:', userId);
    return this.despesaService.criarDespesa(
      body.titulo,
      body.valor,
      userId,
      body.categoriaId,
    ); //TODO: teste rota com adição de catergoria
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'listar despesas' })
  async listarDespesas(@Request() req, @Query() filtro: FiltroDespesaDto) {
    const userId = req.user.id;
    return this.despesaService.listarDespesasDoUsuario(userId, filtro);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'atualizar despesas' })
  async atualizarDespesa(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDespesaDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.despesaService.atualizarDespesa(id, userId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'deletar despesa' })
  async deletarDespesa(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id;
    return this.despesaService.deletarDespesa(id, userId);
  }
}
