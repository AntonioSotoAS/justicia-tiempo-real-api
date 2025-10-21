# 📚 Documentación de API - Justibot API

## 🚀 Información General

**Nombre del Proyecto:** Justibot API  
**Versión:** 0.0.1  
**Framework:** NestJS  
**Base de Datos:** MySQL  
**Autenticación:** JWT + Passport  

## 🔐 Autenticación

### Endpoints de Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Registrar nuevo usuario | ❌ Público |
| `POST` | `/auth/login` | Iniciar sesión | ❌ Público |
| `POST` | `/auth/refresh` | Renovar token de acceso | ❌ Público |
| `POST` | `/auth/logout` | Cerrar sesión | ✅ Requerida |
| `GET` | `/auth/profile` | Obtener perfil del usuario | ✅ Requerida |
| `POST` | `/auth/change-password` | Cambiar contraseña | ✅ Requerida |
| `GET` | `/auth/debug/users` | Debug - Listar usuarios | ❌ Público |

### DTOs de Autenticación

#### LoginDto
```typescript
{
  email: string;        // Email válido
  password: string;     // Mínimo 6 caracteres
}
```

#### RegisterDto
```typescript
{
  name: string;         // Mínimo 2 caracteres
  email: string;        // Email válido
  password: string;     // Mínimo 6 caracteres
  role?: string;        // Opcional, por defecto 'user'
}
```

#### AuthResponseDto
```typescript
{
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
```

#### RefreshTokenDto
```typescript
{
  refresh_token: string;
}
```

#### ChangePasswordDto
```typescript
{
  currentPassword: string;  // Mínimo 6 caracteres
  newPassword: string;      // Mínimo 6 caracteres
}
```

## 👥 Gestión de Usuarios

### Endpoints de Usuarios

| Método | Endpoint | Descripción | Autenticación | Roles |
|--------|----------|-------------|---------------|-------|
| `POST` | `/users` | Crear nuevo usuario | ❌ Público | - |
| `GET` | `/users` | Listar todos los usuarios | ✅ Requerida | - |
| `GET` | `/users/:id` | Obtener usuario por ID | ✅ Requerida | - |
| `PATCH` | `/users/:id` | Actualizar usuario | ✅ Requerida | admin |
| `DELETE` | `/users/:id` | Eliminar usuario | ✅ Requerida | admin |
| `GET` | `/users/profile/me` | Obtener mi perfil | ✅ Requerida | - |

### Entidad User

```typescript
{
  id: number;                    // ID único
  name: string;                  // Nombre del usuario
  email: string;                 // Email único
  password: string;              // Contraseña hasheada
  role: string;                  // Rol (user, admin)
  isActive: boolean;             // Estado activo
  refreshToken: string | null;   // Token de renovación
  createdAt: Date;               // Fecha de creación
  updatedAt: Date;               // Fecha de actualización
}
```

## 📊 Estadísticas

### Endpoints de Estadísticas

| Método | Endpoint | Descripción | Parámetros |
|--------|----------|-------------|------------|
| `GET` | `/estadistica/cuadro-anual` | Obtener cuadro anual | `year?`, `month?` |
| `GET` | `/estadistica/cuadro-anual/actual` | Cuadro anual actual | - |
| `GET` | `/estadistica/cuadro-anual/:year` | Cuadro anual por año | `year` |

### DTOs de Estadísticas

#### CuadroAnualDto
```typescript
{
  anio: number;              // Año del cuadro
  mes_actual: number;        // Mes actual
  meses: string[];           // Array de meses
  filas: FilaDto[];          // Filas de datos
  total_filas: number;       // Total de filas
  fecha_consulta: string;    // Fecha de consulta
}
```

#### FilaDto
```typescript
{
  org_jurisd: string;        // Organización jurisdiccional
  instancia: string;          // Instancia
  jueces: string;             // Jueces
  estandar: number;           // Estándar
  meta_preliminar: number;    // Meta preliminar
  carga_inicial: number;      // Carga inicial
  pct_real_avance: number;    // Porcentaje real de avance
  pct_ideal_avance: number;   // Porcentaje ideal de avance
  nivel_prod: string;         // Nivel de productividad
  niv_bueno: number;          // Nivel bueno
  niv_muy_bueno: number;      // Nivel muy bueno
  res_cells: ResCellDto[];    // Celdas de resolución
  ing_cells: IngCellDto[];    // Celdas de ingreso
  res_total: number;          // Total resoluciones
  ing_total: number;          // Total ingresos
  modulo_id: number;          // ID del módulo
  modulo_nom: string;         // Nombre del módulo
  n_orden: number;            // Número de orden
}
```

#### ResCellDto
```typescript
{
  val: number;    // Valor
  cls: string;    // Clase
  nivel: string;  // Nivel
}
```

#### IngCellDto
```typescript
{
  val: number;    // Valor
  cls: string;    // Clase
  nivel: string;  // Nivel
}
```

## 🔧 Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Configuración de Base de Datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root1234@
DB_DATABASE=csjsanta_indicadores

# Configuración de la Aplicación
NODE_ENV=development
PORT=3000

# JWT Configuration
JWT_SECRET=tu_jwt_secret_aqui
JWT_EXPIRES_IN=1h
JWT_REFRESH_SECRET=tu_refresh_secret_aqui
JWT_REFRESH_EXPIRES_IN=7d
```

### Scripts Disponibles

```bash
# Desarrollo
npm run start:dev

# Producción
npm run start:prod

# Build
npm run build

# Tests
npm run test
npm run test:e2e
```

## 🛡️ Seguridad

### Roles y Permisos

- **user**: Usuario básico con acceso limitado
- **admin**: Administrador con acceso completo

### Autenticación JWT

- **Access Token**: Válido por 1 hora
- **Refresh Token**: Válido por 7 días
- **Estrategia**: Passport JWT + Local

### Validaciones

- Validación de entrada con `class-validator`
- Hash de contraseñas con `bcryptjs`
- Protección de rutas con Guards

## 📝 Ejemplos de Uso

### Registro de Usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123",
    "role": "user"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Obtener Cuadro Anual

```bash
curl -X GET "http://localhost:3000/estadistica/cuadro-anual?year=2024&month=6" \
  -H "Authorization: Bearer tu_access_token"
```

## 🚨 Códigos de Respuesta

| Código | Descripción |
|--------|-------------|
| `200` | OK - Solicitud exitosa |
| `201` | Created - Recurso creado |
| `400` | Bad Request - Datos inválidos |
| `401` | Unauthorized - No autenticado |
| `403` | Forbidden - Sin permisos |
| `404` | Not Found - Recurso no encontrado |
| `500` | Internal Server Error - Error del servidor |

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── auth/                    # Módulo de autenticación
│   │   ├── auth.controller.ts   # Controlador de auth
│   │   ├── auth.service.ts      # Servicio de auth
│   │   ├── dto/                 # DTOs de autenticación
│   │   ├── guards/              # Guards de seguridad
│   │   └── strategies/          # Estrategias de Passport
│   ├── users/                   # Módulo de usuarios
│   │   ├── users.controller.ts  # Controlador de usuarios
│   │   ├── users.service.ts     # Servicio de usuarios
│   │   └── entities/            # Entidades de usuario
│   ├── estadistica/             # Módulo de estadísticas
│   │   ├── estadistica.controller.ts
│   │   ├── estadistica.service.ts
│   │   └── dto/                 # DTOs de estadísticas
│   └── seed/                    # Módulo de seeders
├── config/                      # Configuración
└── main.ts                      # Punto de entrada
```

## 🔗 Dependencias Principales

- **@nestjs/common**: Framework base
- **@nestjs/typeorm**: ORM para base de datos
- **@nestjs/jwt**: Manejo de JWT
- **@nestjs/passport**: Autenticación
- **class-validator**: Validación de datos
- **bcryptjs**: Hash de contraseñas
- **mysql2**: Driver de MySQL

---

**Desarrollado con ❤️ usando NestJS**
