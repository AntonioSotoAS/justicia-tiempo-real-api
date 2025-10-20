# Estructura del Proyecto - Módulo de Estadísticas

## 📁 Estructura de Directorios

```
src/
├── conector/                    # Módulo Conector
│   ├── entities/               # Entidades TypeORM
│   │   ├── mae-est-meta-resumenes-modificado.entity.ts
│   │   ├── mov-est-instancia-jueces.entity.ts
│   │   ├── mae-est-jueces.entity.ts
│   │   ├── mae-est-juez-tipos.entity.ts
│   │   ├── mae-est-usuarios.entity.ts
│   │   └── mae-est-sexos.entity.ts
│   └── conector.module.ts      # Módulo del conector
├── estadisticas/               # Módulo de Estadísticas
│   ├── controllers/            # Controladores REST
│   │   ├── mae-est-meta-resumenes-modificado.controller.ts
│   │   ├── mov-est-instancia-jueces.controller.ts
│   │   ├── mae-est-jueces.controller.ts
│   │   ├── mae-est-juez-tipos.controller.ts
│   │   ├── mae-est-usuarios.controller.ts
│   │   └── mae-est-sexos.controller.ts
│   ├── services/               # Servicios de negocio
│   │   ├── mae-est-meta-resumenes-modificado.service.ts
│   │   ├── mov-est-instancia-jueces.service.ts
│   │   ├── mae-est-jueces.service.ts
│   │   ├── mae-est-juez-tipos.service.ts
│   │   ├── mae-est-usuarios.service.ts
│   │   └── mae-est-sexos.service.ts
│   ├── dto/                    # DTOs de validación
│   │   ├── mae-est-meta-resumenes-modificado.dto.ts
│   │   ├── mov-est-instancia-jueces.dto.ts
│   │   ├── mae-est-jueces.dto.ts
│   │   ├── mae-est-juez-tipos.dto.ts
│   │   ├── mae-est-usuarios.dto.ts
│   │   └── mae-est-sexos.dto.ts
│   └── estadisticas.module.ts  # Módulo de estadísticas
├── app.module.ts              # Módulo principal
└── main.ts                    # Punto de entrada
```

## 🔧 Módulos

### ConectorModule
- **Propósito**: Contiene todas las entidades TypeORM
- **Responsabilidad**: Configuración de TypeORM para las entidades
- **Exporta**: TypeOrmModule con todas las entidades

### EstadisticasModule
- **Propósito**: Lógica de negocio y endpoints REST
- **Dependencias**: ConectorModule
- **Incluye**: Controllers, Services, DTOs

## 🚀 Endpoints Disponibles

### Meta Resúmenes Modificados
- `GET /meta-resumenes` - Listar todos
- `GET /meta-resumenes/:id` - Obtener por ID
- `GET /meta-resumenes/anio-mes?anio=2024&mes=1` - Buscar por año y mes
- `GET /meta-resumenes/instancia/:instanciaId` - Buscar por instancia
- `POST /meta-resumenes` - Crear nuevo
- `PATCH /meta-resumenes/:id` - Actualizar
- `DELETE /meta-resumenes/:id` - Eliminar

### Instancia Jueces
- `GET /instancia-jueces` - Listar todos
- `GET /instancia-jueces/:id` - Obtener por ID
- `GET /instancia-jueces/activos` - Solo activos
- `GET /instancia-jueces/juez/:juezId` - Por juez
- `GET /instancia-jueces/instancia/:instanciaId` - Por instancia
- `POST /instancia-jueces` - Crear nuevo
- `PATCH /instancia-jueces/:id` - Actualizar
- `DELETE /instancia-jueces/:id` - Eliminar

### Jueces
- `GET /jueces` - Listar todos
- `GET /jueces/:id` - Obtener por ID
- `GET /jueces/activos` - Solo activos
- `GET /jueces/usuario/:usuarioId` - Por usuario
- `GET /jueces/tipo/:tipoId` - Por tipo
- `POST /jueces` - Crear nuevo
- `PATCH /jueces/:id` - Actualizar
- `DELETE /jueces/:id` - Eliminar

### Tipos de Juez
- `GET /juez-tipos` - Listar todos
- `GET /juez-tipos/:id` - Obtener por ID
- `GET /juez-tipos/buscar?descripcion=texto` - Buscar por descripción
- `POST /juez-tipos` - Crear nuevo
- `PATCH /juez-tipos/:id` - Actualizar
- `DELETE /juez-tipos/:id` - Eliminar

### Usuarios
- `GET /usuarios` - Listar todos
- `GET /usuarios/:id` - Obtener por ID
- `GET /usuarios/activos` - Solo activos
- `GET /usuarios/username/:username` - Por nombre de usuario
- `GET /usuarios/email/:email` - Por email
- `GET /usuarios/dni/:dni` - Por DNI
- `GET /usuarios/sexo/:sexoId` - Por sexo
- `POST /usuarios` - Crear nuevo
- `PATCH /usuarios/:id` - Actualizar
- `DELETE /usuarios/:id` - Eliminar

### Sexos
- `GET /sexos` - Listar todos
- `GET /sexos/:id` - Obtener por ID
- `GET /sexos/buscar?descripcion=texto` - Buscar por descripción
- `POST /sexos` - Crear nuevo
- `PATCH /sexos/:id` - Actualizar
- `DELETE /sexos/:id` - Eliminar

## ⚙️ Configuración

1. **Variables de entorno** (archivo `.env`):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=justibot_db
NODE_ENV=development
PORT=3000
```

2. **Instalación**:
```bash
npm install
npm run start:dev
```

## 🎯 Ventajas de esta Estructura

- **Separación de responsabilidades**: Conector solo maneja entidades
- **Modularidad**: Estadísticas es independiente y reutilizable
- **Mantenibilidad**: Fácil de extender y modificar
- **Escalabilidad**: Fácil agregar nuevos módulos
