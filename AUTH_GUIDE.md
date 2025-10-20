# 🔐 Sistema de Autenticación - Justibot API

## 📋 Descripción

Sistema completo de autenticación con JWT, roles y decoradores para la API de Justibot.

## 🚀 Características

- ✅ **Registro de usuarios** con hash de contraseñas
- ✅ **Login con JWT** (access token + refresh token)
- ✅ **Protección de rutas** con decoradores
- ✅ **Sistema de roles** (admin, user, etc.)
- ✅ **Refresh token** para renovar sesiones
- ✅ **Cambio de contraseñas**
- ✅ **Logout seguro**

## 🛠️ Instalación

```bash
# Las dependencias ya están instaladas
npm install @nestjs/jwt @nestjs/passport passport passport-jwt passport-local bcryptjs
npm install --save-dev @types/passport-jwt @types/passport-local @types/bcryptjs
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` con:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production

# Database
MAIN_DB_HOST=localhost
MAIN_DB_PORT=3306
MAIN_DB_USERNAME=root
MAIN_DB_PASSWORD=naruto20
MAIN_DB_DATABASE=justibot
```

## 📚 Endpoints de Autenticación

### 🔐 Registro
```http
POST /auth/register
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "role": "user"
}
```

**Respuesta:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "role": "user",
    "isActive": true
  }
}
```

### 🔑 Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "123456"
}
```

### 🔄 Refresh Token
```http
POST /auth/refresh
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 🚪 Logout
```http
POST /auth/logout
Authorization: Bearer <access_token>
```

### 👤 Perfil
```http
GET /auth/profile
Authorization: Bearer <access_token>
```

### 🔒 Cambiar Contraseña
```http
POST /auth/change-password
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "currentPassword": "123456",
  "newPassword": "nueva123456"
}
```

## 🎯 Decoradores Disponibles

### 🔓 @Public()
Marca una ruta como pública (no requiere autenticación).

```typescript
@Public()
@Get('public-endpoint')
getPublicData() {
  return { message: 'Esta ruta es pública' };
}
```

### 🔐 @Auth()
Protege una ruta (requiere autenticación).

```typescript
@Auth()
@Get('protected')
getProtectedData(@CurrentUser() user: any) {
  return { message: 'Solo usuarios autenticados', user };
}
```

### 👑 @AuthWithRoles('admin', 'moderator')
Protege una ruta con roles específicos.

```typescript
@AuthWithRoles('admin')
@Delete(':id')
deleteUser(@Param('id') id: string) {
  return this.usersService.remove(+id);
}
```

### 👤 @CurrentUser()
Obtiene el usuario actual autenticado.

```typescript
@Auth()
@Get('my-profile')
getMyProfile(@CurrentUser() user: any) {
  return {
    id: user.userId,
    email: user.email,
    role: user.role
  };
}
```

## 🏗️ Estructura del Sistema

```
src/app/auth/
├── auth.controller.ts          # Controlador de autenticación
├── auth.service.ts            # Lógica de negocio
├── auth.module.ts             # Módulo de autenticación
├── dto/
│   └── auth.dto.ts            # DTOs para requests/responses
├── decorators/
│   └── auth.decorators.ts     # Decoradores personalizados
├── guards/
│   └── roles.guard.ts         # Guard para roles
└── strategies/
    ├── jwt.strategy.ts        # Estrategia JWT
    └── local.strategy.ts      # Estrategia Local
```

## 🔧 Uso en Controladores

### Ejemplo Básico
```typescript
import { Auth, CurrentUser, Public } from '../auth/decorators/auth.decorators';

@Controller('example')
export class ExampleController {
  
  @Public()
  @Get('public')
  getPublicData() {
    return { message: 'Público' };
  }

  @Auth()
  @Get('protected')
  getProtectedData(@CurrentUser() user: any) {
    return { message: 'Protegido', user };
  }

  @AuthWithRoles('admin')
  @Get('admin-only')
  getAdminData() {
    return { message: 'Solo admin' };
  }
}
```

## 🛡️ Seguridad

- ✅ **Contraseñas hasheadas** con bcrypt
- ✅ **JWT con expiración** (15 minutos)
- ✅ **Refresh tokens** (7 días)
- ✅ **Validación de roles**
- ✅ **Protección de rutas**
- ✅ **Logout seguro**

## 🧪 Testing

### Crear Usuario Admin
```bash
curl -X POST http://localhost:5002/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin",
    "email": "admin@justibot.com",
    "password": "admin123",
    "role": "admin"
  }'
```

### Login
```bash
curl -X POST http://localhost:5002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@justibot.com",
    "password": "admin123"
  }'
```

### Usar Token
```bash
curl -X GET http://localhost:5002/auth/profile \
  -H "Authorization: Bearer <tu-access-token>"
```

## 🎉 ¡Listo!

Tu sistema de autenticación está completamente configurado y listo para usar. Puedes:

1. **Registrar usuarios** en `/auth/register`
2. **Hacer login** en `/auth/login`
3. **Proteger rutas** con `@Auth()`
4. **Controlar roles** con `@AuthWithRoles()`
5. **Obtener usuario actual** con `@CurrentUser()`

¡Tu API ahora tiene autenticación completa! 🚀
