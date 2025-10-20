import { IsEmail, IsString, MinLength, IsOptional, IsBoolean } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  @IsString()
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  role?: string;
}

export class AuthResponseDto {
  access_token: string;
  refresh_token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
  };
}

export class RefreshTokenDto {
  @IsString()
  refresh_token: string;
}

export class ChangePasswordDto {
  @IsString()
  @MinLength(6)
  currentPassword: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}
