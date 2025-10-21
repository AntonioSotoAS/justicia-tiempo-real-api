export class JuezObjetoDto {
  nombre_completo: string;
  telefono: string;
  l_mensaje: boolean;
  sexo: string;
}

export class ResCellDto {
  val: number;
  cls: string;
  nivel: string;
}

export class IngCellDto {
  val: number;
  cls: string;
  nivel: string;
}

export class FilaDto {
  org_jurisd: string;
  instancia: string;
  jueces: string;
  jueces_objetos: JuezObjetoDto[];
  estandar: number;
  meta_preliminar: number;
  carga_inicial: number;
  pct_real_avance: number;
  pct_ideal_avance: number;
  nivel_prod: string;
  niv_bueno: number;
  niv_muy_bueno: number;
  res_cells: ResCellDto[];
  ing_cells: IngCellDto[];
  res_total: number;
  ing_total: number;
  modulo_id: number;
  modulo_nom: string;
  n_orden: number;
}

export class CuadroAnualDto {
  anio: number;
  mes_actual: number;
  meses: string[];
  filas: FilaDto[];
  total_filas: number;
  fecha_consulta: string;
}
