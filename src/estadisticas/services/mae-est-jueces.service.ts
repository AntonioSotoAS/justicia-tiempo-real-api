import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MaeEstJueces } from '../../conector/entities/mae-est-jueces.entity';
import { MaeEstMetaResumenesModificado } from '../../conector/entities/mae-est-meta-resumenes-modificado.entity';
import { MovEstInstanciaJueces } from '../../conector/entities/mov-est-instancia-jueces.entity';
import { CreateMaeEstJuecesDto } from '../dto/mae-est-jueces.dto';
import { UpdateMaeEstJuecesDto } from '../dto/mae-est-jueces.dto';
import { JuezMetaResumenDto } from '../dto/juez-meta-resumen.dto';
import { JuezCompletoDto } from '../dto/juez-completo.dto';


@Injectable()
export class MaeEstJuecesService {
  constructor(
    @InjectRepository(MaeEstJueces)
    private readonly juecesRepository: Repository<MaeEstJueces>,
    @InjectRepository(MaeEstMetaResumenesModificado)
    private readonly metaResumenesRepository: Repository<MaeEstMetaResumenesModificado>,
    @InjectRepository(MovEstInstanciaJueces)
    private readonly instanciaJuecesRepository: Repository<MovEstInstanciaJueces>,
  ) {}

  async create(createDto: CreateMaeEstJuecesDto): Promise<MaeEstJueces> {
    const juez = this.juecesRepository.create(createDto);
    return await this.juecesRepository.save(juez);
  }

  async findAll(): Promise<MaeEstJueces[]> {
    return await this.juecesRepository.find();
  }

  async findOne(id: number): Promise<MaeEstJueces | null> {
    return await this.juecesRepository.findOne({ where: { n_id_juez: id } });
  }

  async update(id: number, updateDto: UpdateMaeEstJuecesDto): Promise<MaeEstJueces | null> {
    await this.juecesRepository.update(id, updateDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.juecesRepository.delete(id);
  }

  async findByUsuario(usuarioId: number): Promise<MaeEstJueces[]> {
    return await this.juecesRepository.find({
      where: { usuario_id: usuarioId }
    });
  }

  async findByTipo(tipoId: number): Promise<MaeEstJueces[]> {
    return await this.juecesRepository.find({
      where: { n_id_juez_tipo_id: tipoId }
    });
  }

  async findActive(): Promise<MaeEstJueces[]> {
    return await this.juecesRepository.find({
      where: { l_activo: '1' }
    });
  }

  async findJuecesWithMetaResumenes(): Promise<JuezMetaResumenDto[]> {
    const query = `
      SELECT 
        j.n_id_juez,
        j.usuario_id,
        j.n_id_juez_tipo_id,
        j.l_activo,
        u.x_nombres,
        u.x_app_paterno,
        u.x_app_materno,
        u.x_dni,
        u.x_telefono,
        u.email,
        u.username,
        u.n_id_sexo_id,
        s.x_descripcion as x_sexo_descripcion,
        jt.x_descripcion as x_juez_tipo_descripcion,
        mr.n_id_meta_resumen_mod,
        mr.n_anio_est,
        mr.n_mes_est,
        mr.m_estandar_prod,
        mr.n_carg_procesal_ini,
        mr.m_t_resuelto,
        mr.m_t_ingreso,
        mr.m_t_ingreso_proy,
        mr.m_ing_proyectado,
        mr.m_carg_procesal_tram,
        mr.m_carg_procesal_min,
        mr.m_carg_procesal_max,
        mr.m_egre_otra_dep,
        mr.m_ing_otra_dep,
        mr.m_pend_reserva,
        mr.m_meta_preliminar,
        mr.x_situacion_carga,
        mr.m_avan_meta,
        mr.m_ideal_avan_meta,
        mr.m_ideal_avan_meta_ant,
        mr.x_niv_produc,
        mr.m_niv_bueno,
        mr.m_niv_muy_bueno,
        mr.f_fecha_mod,
        mr.l_estado,
        mr.m_op_egre_otra_dep,
        mr.m_op_ing_otra_dep,
        mr.m_op_pend_reserva,
        mr.n_valor_modificado,
        mr.n_meta_opj,
        mr.l_corte,
        mr.n_instancia_id,
        mr.n_id_modulo_id
      FROM mae_est_jueces j
      INNER JOIN mae_est_usuarios u ON j.usuario_id = u.id
      LEFT JOIN mae_est_sexos s ON u.n_id_sexo_id = s.n_id_sexo
      LEFT JOIN mae_est_juez_tipos jt ON j.n_id_juez_tipo_id = jt.n_id_juez_tipo
      LEFT JOIN mov_est_instancia_jueces ij ON j.n_id_juez = ij.n_id_juez_id
      LEFT JOIN mae_est_meta_resumenes_modificado mr ON ij.n_instancia_id = mr.n_instancia_id
      WHERE j.l_activo = '1'
      ORDER BY j.n_id_juez, mr.n_anio_est DESC, mr.n_mes_est DESC
    `;

    return await this.juecesRepository.query(query);
  }

  async findJuezWithMetaResumenes(juezId: number): Promise<JuezMetaResumenDto[]> {
    const query = `
      SELECT 
        j.n_id_juez,
        j.usuario_id,
        j.n_id_juez_tipo_id,
        j.l_activo,
        u.x_nombres,
        u.x_app_paterno,
        u.x_app_materno,
        u.x_dni,
        u.x_telefono,
        u.email,
        u.username,
        u.n_id_sexo_id,
        s.x_descripcion as x_sexo_descripcion,
        jt.x_descripcion as x_juez_tipo_descripcion,
        mr.n_id_meta_resumen_mod,
        mr.n_anio_est,
        mr.n_mes_est,
        mr.m_estandar_prod,
        mr.n_carg_procesal_ini,
        mr.m_t_resuelto,
        mr.m_t_ingreso,
        mr.m_t_ingreso_proy,
        mr.m_ing_proyectado,
        mr.m_carg_procesal_tram,
        mr.m_carg_procesal_min,
        mr.m_carg_procesal_max,
        mr.m_egre_otra_dep,
        mr.m_ing_otra_dep,
        mr.m_pend_reserva,
        mr.m_meta_preliminar,
        mr.x_situacion_carga,
        mr.m_avan_meta,
        mr.m_ideal_avan_meta,
        mr.m_ideal_avan_meta_ant,
        mr.x_niv_produc,
        mr.m_niv_bueno,
        mr.m_niv_muy_bueno,
        mr.f_fecha_mod,
        mr.l_estado,
        mr.m_op_egre_otra_dep,
        mr.m_op_ing_otra_dep,
        mr.m_op_pend_reserva,
        mr.n_valor_modificado,
        mr.n_meta_opj,
        mr.l_corte,
        mr.n_instancia_id,
        mr.n_id_modulo_id
      FROM mae_est_jueces j
      INNER JOIN mae_est_usuarios u ON j.usuario_id = u.id
      LEFT JOIN mae_est_sexos s ON u.n_id_sexo_id = s.n_id_sexo
      LEFT JOIN mae_est_juez_tipos jt ON j.n_id_juez_tipo_id = jt.n_id_juez_tipo
      LEFT JOIN mov_est_instancia_jueces ij ON j.n_id_juez = ij.n_id_juez_id
      LEFT JOIN mae_est_meta_resumenes_modificado mr ON ij.n_instancia_id = mr.n_instancia_id
      WHERE j.n_id_juez = ? AND j.l_activo = '1'
      ORDER BY mr.n_anio_est DESC, mr.n_mes_est DESC
    `;

    return await this.juecesRepository.query(query, [juezId]);
  }



  async findJuecesCompletos(): Promise<JuezCompletoDto[]> {
    const query = `
      SELECT 
        j.n_id_juez,
        j.l_activo,
        j.usuario_id,
        j.n_id_juez_tipo_id,
        jt.x_descripcion as x_juez_tipo_descripcion,
        u.x_nombres,
        u.x_app_paterno,
        u.x_app_materno,
        u.x_dni,
        u.x_telefono,
        u.email,
        u.username,
        u.profile_image,
        u.l_mensaje,
        u.n_id_sexo_id,
        s.x_descripcion as x_sexo_descripcion,
        i.n_instancia_id,
        i.x_nom_instancia
      FROM mae_est_jueces j
      INNER JOIN mae_est_usuarios u ON j.usuario_id = u.id
      LEFT JOIN mae_est_juez_tipos jt ON j.n_id_juez_tipo_id = jt.n_id_juez_tipo
      LEFT JOIN mae_est_sexos s ON u.n_id_sexo_id = s.n_id_sexo
      LEFT JOIN mov_est_instancia_jueces ij ON j.n_id_juez = ij.n_id_juez_id
      LEFT JOIN mae_est_instancia i ON ij.n_instancia_id = i.n_instancia_id
      WHERE j.l_activo = 'S'
      ORDER BY j.n_id_juez
    `;

    return await this.juecesRepository.query(query);
  }


  async findMetaResumenByInstancia(anio: number, mes: number, instanciaId: number): Promise<any[]> {
    const query = `
      SELECT 
        mr.n_id_meta_resumen_mod,
        mr.m_niv_bueno,
        mr.m_niv_muy_bueno,
        mr.m_avan_meta,
        i.n_instancia_id,
        mr.x_niv_produc,
        mr.m_meta_preliminar,
        mr.m_t_resuelto,
        mr.n_anio_est,
        mr.n_mes_est
      FROM mae_est_instancia i
      INNER JOIN mae_est_meta_resumenes_modificado mr ON i.n_instancia_id = mr.n_instancia_id
      WHERE mr.n_anio_est = ? 
        AND mr.n_mes_est = ? 
        AND i.n_instancia_id = ?
        AND mr.l_estado = 'C'
      ORDER BY i.n_instancia_id
    `;

    return await this.juecesRepository.query(query, [anio, mes, instanciaId]);
  }

  async findJuecesWithMetaResumenesActuales(anio: number, mes: number): Promise<any[]> {
    const query = `
      SELECT 
        j.n_id_juez,
        j.l_activo,
        j.usuario_id,
        j.n_id_juez_tipo_id,
        jt.x_descripcion as x_juez_tipo_descripcion,
        u.x_nombres,
        u.x_app_paterno,
        u.x_app_materno,
        u.x_dni,
        u.x_telefono,
        u.email,
        u.username,
        u.profile_image,
        u.l_mensaje,
        u.n_id_sexo_id,
        s.x_descripcion as x_sexo_descripcion,
        i.n_instancia_id,
        i.x_nom_instancia,
        mr.n_id_meta_resumen_mod,
        mr.m_niv_bueno,
        mr.m_niv_muy_bueno,
        mr.m_avan_meta,
        mr.x_niv_produc,
        mr.m_meta_preliminar,
        mr.m_t_resuelto,
        mr.n_anio_est,
        mr.n_mes_est,
        CASE 
          WHEN mr.n_id_meta_resumen_mod IS NOT NULL THEN true 
          ELSE false 
        END as tiene_meta_resumen
      FROM mae_est_jueces j
      INNER JOIN mae_est_usuarios u ON j.usuario_id = u.id
      LEFT JOIN mae_est_juez_tipos jt ON j.n_id_juez_tipo_id = jt.n_id_juez_tipo
      LEFT JOIN mae_est_sexos s ON u.n_id_sexo_id = s.n_id_sexo
      LEFT JOIN mov_est_instancia_jueces ij ON j.n_id_juez = ij.n_id_juez_id
      LEFT JOIN mae_est_instancia i ON ij.n_instancia_id = i.n_instancia_id
      LEFT JOIN mae_est_meta_resumenes_modificado mr ON i.n_instancia_id = mr.n_instancia_id 
        AND mr.n_anio_est = ? 
        AND mr.n_mes_est = ? 
        AND mr.l_estado = 'C'
      WHERE j.l_activo = 'S'
      ORDER BY j.n_id_juez
    `;

    return await this.juecesRepository.query(query, [anio, mes]);
  }

}
