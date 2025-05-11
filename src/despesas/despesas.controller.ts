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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FiltroDespesaDto } from './dto/filtro-despesa.dto';
import { UpdateDespesaDto } from './dto/update-despesa.dto';

@ApiTags('Despesas')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('despesas')
export class DespesaController {
  constructor(private readonly despesaService: DespesasService) {}

  @Post()
  @ApiOperation({ summary: 'criar despesa' })
  @ApiResponse({ status: 201, description: 'Despesa criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async criarDespesa(@Body() body: CreateDespesaDto, @Request() req) {
    const userId = req.user.id;
    return this.despesaService.criarDespesa(
      body.titulo,
      body.valor,
      userId,
      body.categoriaId,
    );
  }

  @Get()
  @ApiOperation({ summary: 'listar despesas' })
  async listarDespesas(@Request() req, @Query() filtro: FiltroDespesaDto) {
    const userId = req.user.id;
    return this.despesaService.listarDespesasDoUsuario(userId, filtro);
  }

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

  @Delete(':id')
  @ApiOperation({ summary: 'deletar despesa' })
  async deletarDespesa(@Param('id', ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id;
    return this.despesaService.deletarDespesa(id, userId);
  }
}
