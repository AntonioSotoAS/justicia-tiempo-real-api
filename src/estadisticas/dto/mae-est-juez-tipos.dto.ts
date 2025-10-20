import { IsOptional, IsString } from 'class-validator';

export class CreateMaeEstJuezTiposDto {
  @IsString()
  x_descripcion: string;
}

export class UpdateMaeEstJuezTiposDto {
  @IsOptional()
  @IsString()
  x_descripcion?: string;
}
