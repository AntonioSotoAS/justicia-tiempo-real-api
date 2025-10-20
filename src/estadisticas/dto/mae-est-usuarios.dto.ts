import { IsOptional, IsString, IsEmail, IsBoolean, IsNumber, IsDateString } from 'class-validator';

export class CreateMaeEstUsuariosDto {
  @IsString()
  password: string;

  @IsOptional()
  @IsDateString()
  last_login?: string;

  @IsBoolean()
  is_superuser: boolean;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  is_staff: boolean;

  @IsBoolean()
  is_active: boolean;

  @IsDateString()
  date_joined: string;

  @IsString()
  x_dni: string;

  @IsString()
  x_nombres: string;

  @IsString()
  x_app_paterno: string;

  @IsString()
  x_app_materno: string;

  @IsString()
  x_telefono: string;

  @IsString()
  profile_image: string;

  @IsBoolean()
  l_mensaje: boolean;

  @IsNumber()
  n_id_sexo_id: number;
}

export class UpdateMaeEstUsuariosDto {
  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsDateString()
  last_login?: string;

  @IsOptional()
  @IsBoolean()
  is_superuser?: boolean;

  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsBoolean()
  is_staff?: boolean;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsOptional()
  @IsDateString()
  date_joined?: string;

  @IsOptional()
  @IsString()
  x_dni?: string;

  @IsOptional()
  @IsString()
  x_nombres?: string;

  @IsOptional()
  @IsString()
  x_app_paterno?: string;

  @IsOptional()
  @IsString()
  x_app_materno?: string;

  @IsOptional()
  @IsString()
  x_telefono?: string;

  @IsOptional()
  @IsString()
  profile_image?: string;

  @IsOptional()
  @IsBoolean()
  l_mensaje?: boolean;

  @IsOptional()
  @IsNumber()
  n_id_sexo_id?: number;
}
