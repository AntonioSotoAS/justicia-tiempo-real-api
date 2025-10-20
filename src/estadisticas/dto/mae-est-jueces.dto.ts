import { IsOptional, IsNumber, IsString, IsInt } from 'class-validator';

export class CreateMaeEstJuecesDto {
  @IsString()
  l_activo: string;

  @IsInt()
  usuario_id: number;

  @IsNumber()
  n_id_juez_tipo_id: number;
}

export class UpdateMaeEstJuecesDto {
  @IsOptional()
  @IsString()
  l_activo?: string;

  @IsOptional()
  @IsInt()
  usuario_id?: number;

  @IsOptional()
  @IsNumber()
  n_id_juez_tipo_id?: number;
}
