import { IsOptional, IsString } from 'class-validator';

export class CreateMaeEstSexosDto {
  @IsString()
  x_descripcion: string;
}

export class UpdateMaeEstSexosDto {
  @IsOptional()
  @IsString()
  x_descripcion?: string;
}
