import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MaeEstMetaResumenesModificado } from './entities/mae-est-meta-resumenes-modificado.entity';
import { MovEstInstanciaJueces } from './entities/mov-est-instancia-jueces.entity';
import { MaeEstJueces } from './entities/mae-est-jueces.entity';
import { MaeEstJuezTipos } from './entities/mae-est-juez-tipos.entity';
import { MaeEstUsuarios } from './entities/mae-est-usuarios.entity';
import { MaeEstSexos } from './entities/mae-est-sexos.entity';
import { MaeEstInstancia } from './entities/mae-est-instancia.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MaeEstMetaResumenesModificado,
      MovEstInstanciaJueces,
      MaeEstJueces,
      MaeEstJuezTipos,
      MaeEstUsuarios,
      MaeEstSexos,
      MaeEstInstancia,
    ]),
  ],
  exports: [
    TypeOrmModule,
  ],
})
export class ConectorModule {}
