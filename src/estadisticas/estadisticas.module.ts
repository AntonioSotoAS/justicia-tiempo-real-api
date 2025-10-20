import { Module } from '@nestjs/common';
import { ConectorModule } from '../conector/conector.module';

// Services
import { MaeEstMetaResumenesModificadoService } from './services/mae-est-meta-resumenes-modificado.service';
import { MovEstInstanciaJuecesService } from './services/mov-est-instancia-jueces.service';
import { MaeEstJuecesService } from './services/mae-est-jueces.service';
import { MaeEstJuezTiposService } from './services/mae-est-juez-tipos.service';
import { MaeEstUsuariosService } from './services/mae-est-usuarios.service';
import { MaeEstSexosService } from './services/mae-est-sexos.service';
import { MaeEstInstanciaService } from './services/mae-est-instancia.service';

// Controllers
import { MaeEstMetaResumenesModificadoController } from './controllers/mae-est-meta-resumenes-modificado.controller';
import { MovEstInstanciaJuecesController } from './controllers/mov-est-instancia-jueces.controller';
import { MaeEstJuecesController } from './controllers/mae-est-jueces.controller';
import { MaeEstJuezTiposController } from './controllers/mae-est-juez-tipos.controller';
import { MaeEstUsuariosController } from './controllers/mae-est-usuarios.controller';
import { MaeEstSexosController } from './controllers/mae-est-sexos.controller';
import { MaeEstInstanciaController } from './controllers/mae-est-instancia.controller';

@Module({
  imports: [ConectorModule],
  controllers: [
    MaeEstMetaResumenesModificadoController,
    MovEstInstanciaJuecesController,
    MaeEstJuecesController,
    MaeEstJuezTiposController,
    MaeEstUsuariosController,
    MaeEstSexosController,
    MaeEstInstanciaController,
  ],
  providers: [
    MaeEstMetaResumenesModificadoService,
    MovEstInstanciaJuecesService,
    MaeEstJuecesService,
    MaeEstJuezTiposService,
    MaeEstUsuariosService,
    MaeEstSexosService,
    MaeEstInstanciaService,
  ],
  exports: [
    MaeEstMetaResumenesModificadoService,
    MovEstInstanciaJuecesService,
    MaeEstJuecesService,
    MaeEstJuezTiposService,
    MaeEstUsuariosService,
    MaeEstSexosService,
    MaeEstInstanciaService,
  ],
})
export class EstadisticasModule {}
