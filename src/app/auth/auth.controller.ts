import { Controller, Post, Body, UseGuards, Get, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, AuthResponseDto, RefreshTokenDto, ChangePasswordDto } from './dto/auth.dto';
import { Auth, CurrentUser, Public } from './decorators/auth.decorators';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<{ access_token: string }> {
    return this.authService.refreshToken(refreshTokenDto.refresh_token);
  }

  @Auth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@CurrentUser() user: any): Promise<{ message: string }> {
    await this.authService.logout(user.userId);
    return { message: 'Sesión cerrada exitosamente' };
  }

  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return {
      id: user.userId,
      email: user.email,
      role: user.role,
    };
  }

  @Auth()
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @CurrentUser() user: any,
    @Body() changePasswordDto: ChangePasswordDto
  ): Promise<{ message: string }> {
    await this.authService.changePassword(user.userId, changePasswordDto);
    return { message: 'Contraseña cambiada exitosamente' };
  }

  @Public()
  @Get('debug/users')
  async debugUsers() {
    return this.authService.debugUsers();
  }
}
