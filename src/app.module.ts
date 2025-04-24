import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TransacaoModule } from './transacao/transacao.module';
import { CategoriaModule } from './categoria/categoria.module';
import { RelatorioModule } from './relatorio/relatorio.module';
import { UploadModule } from './upload/upload.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { DespesasModule } from './despesas/despesas.module';
//import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [AuthModule, UsuarioModule, TransacaoModule, CategoriaModule, RelatorioModule, UploadModule, PrismaModule, ConfigModule.forRoot(), DespesasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
