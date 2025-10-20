# 🌱 Módulo Seed - Justibot API

## 📋 Descripción

Módulo de seed que crea usuarios de prueba automáticamente en la base de datos `justibot` para testing y desarrollo.

## 🚀 Características

- ✅ **Superadmin automático** - Usuario con rol `superadmin`
- ✅ **Usuarios de prueba** - Diferentes roles para testing
- ✅ **Ejecución automática** - Se ejecuta al iniciar en desarrollo
- ✅ **Endpoints manuales** - Para ejecutar seed manualmente
- ✅ **Verificación de duplicados** - No crea usuarios existentes

## 👥 Usuarios Creados

### 👑 Superadmin
- **Email:** `superadmin@justibot.com`
- **Password:** `superadmin123`
- **Role:** `superadmin`

### 👨‍💼 Admin
- **Email:** `admin@justibot.com`
- **Password:** `admin123`
- **Role:** `admin`

### 👤 User
- **Email:** `user@justibot.com`
- **Password:** `user123`
- **Role:** `user`

### 🛡️ Moderator
- **Email:** `moderator@justibot.com`
- **Password:** `moderator123`
- **Role:** `moderator`

## 🎯 Endpoints Disponibles

### 🌱 Ejecutar Seed Completo
```http
POST /seed/run
```
**Respuesta:**
```json
{
  "message": "Seed ejecutado exitosamente",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 👑 Crear Solo Superadmin
```http
POST /seed/superadmin
```
**Respuesta:**
```json
{
  "message": "Superadmin creado/verificado",
  "user": {
    "id": 1,
    "name": "Super Admin",
    "email": "superadmin@justibot.com",
    "role": "superadmin",
    "isActive": true
  }
}
```

### 👥 Crear Usuarios de Prueba
```http
POST /seed/test-users
```
**Respuesta:**
```json
{
  "message": "Usuarios de prueba creados/verificados",
  "users": [
    {
      "id": 2,
      "name": "Admin Test",
      "email": "admin@justibot.com",
      "role": "admin",
      "isActive": true
    },
    // ... más usuarios
  ]
}
```

### 📋 Información de Seed
```http
GET /seed/info
```
**Respuesta:**
```json
{
  "message": "Endpoints de Seed disponibles",
  "endpoints": {
    "POST /seed/run": "Ejecuta todo el proceso de seed",
    "POST /seed/superadmin": "Crea solo el superadmin",
    "POST /seed/test-users": "Crea solo usuarios de prueba",
    "GET /seed/info": "Información de endpoints"
  },
  "credentials": {
    "superadmin": {
      "email": "superadmin@justibot.com",
      "password": "superadmin123",
      "role": "superadmin"
    }
    // ... más credenciales
  }
}
```

## 🔧 Ejecución Automática

El seed se ejecuta automáticamente cuando:
- ✅ `NODE_ENV=development`
- ✅ La aplicación inicia
- ✅ No hay errores si los usuarios ya existen

## 🧪 Testing con Usuarios

### 1. Login como Superadmin
```bash
curl -X POST http://localhost:5002/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@justibot.com",
    "password": "superadmin123"
  }'
```

### 2. Usar Token en Rutas Protegidas
```bash
curl -X GET http://localhost:5002/auth/profile \
  -H "Authorization: Bearer <tu-access-token>"
```

### 3. Probar Rutas con Roles
```bash
# Solo superadmin puede acceder
curl -X GET http://localhost:5002/users \
  -H "Authorization: Bearer <superadmin-token>"
```

## 🏗️ Estructura del Módulo

```
src/app/seed/
├── seed.service.ts           # Lógica de creación de usuarios
├── seed.controller.ts        # Endpoints para ejecutar seed
├── seed-runner.service.ts    # Ejecución automática
└── seed.module.ts           # Módulo de seed
```

## 🎯 Casos de Uso

### Desarrollo
- ✅ Usuarios listos para testing
- ✅ Diferentes roles para probar permisos
- ✅ Credenciales conocidas

### Testing
- ✅ Datos consistentes
- ✅ Roles específicos
- ✅ Fácil reset de datos

### Producción
- ✅ No se ejecuta automáticamente
- ✅ Solo con endpoints manuales
- ✅ Verificación de duplicados

## 🚀 Uso Rápido

1. **Iniciar la aplicación:**
```bash
npm run start:dev
```

2. **Los usuarios se crean automáticamente** (en desarrollo)

3. **Probar login:**
```bash
curl -X POST http://localhost:5002/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "superadmin@justibot.com", "password": "superadmin123"}'
```

4. **Usar el token:**
```bash
curl -X GET http://localhost:5002/auth/profile \
  -H "Authorization: Bearer <access-token>"
```

## 🎉 ¡Listo!

Tu módulo de seed está completamente configurado y listo para usar. Los usuarios se crearán automáticamente al iniciar la aplicación en modo desarrollo. 🚀
