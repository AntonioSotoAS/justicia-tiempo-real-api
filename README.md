# 🏛️ JustiBot API

> **API REST para el Sistema de Gestión Judicial - Estadísticas y Meta Resúmenes**

Una API robusta construida con **NestJS** y **TypeORM** para la gestión de datos judiciales, jueces, instancias y meta resúmenes del sistema judicial.

## 🚀 Características

- ✅ **API REST completa** con NestJS
- ✅ **Base de datos MySQL** con TypeORM
- ✅ **Gestión de Jueces** con datos completos
- ✅ **Meta Resúmenes** por instancia y período
- ✅ **Validación de datos** con DTOs
- ✅ **Documentación automática** con Swagger
- ✅ **Arquitectura modular** y escalable

## 📋 Tabla de Contenidos

- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Endpoints](#-endpoints)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Desarrollo](#-desarrollo)
- [Contribución](#-contribución)

## 🛠️ Instalación

### Prerrequisitos

- **Node.js** >= 18.0.0
- **npm** >= 8.0.0
- **MySQL** >= 8.0

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd justibot-api
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

4. **Configurar la base de datos**
```bash
# Crear la base de datos MySQL
mysql -u root -p
CREATE DATABASE justibot_db;
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=justibot_db

# Aplicación
PORT=5002
NODE_ENV=development
```

### Estructura de Base de Datos

La API maneja las siguientes entidades principales:

- **Jueces** (`mae_est_jueces`)
- **Usuarios** (`mae_est_usuarios`)
- **Instancias** (`mae_est_instancia`)
- **Tipos de Juez** (`mae_est_juez_tipos`)
- **Sexos** (`mae_est_sexos`)
- **Meta Resúmenes** (`mae_est_meta_resumenes_modificado`)

## 🎯 Endpoints

### 👨‍⚖️ Jueces

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/jueces` | Obtener todos los jueces |
| `GET` | `/jueces/activos` | Jueces activos |
| `GET` | `/jueces/completos` | Jueces con datos completos |
| `GET` | `/jueces/con-meta-resumenes/:anio/:mes` | Jueces con meta resúmenes |
| `GET` | `/jueces/:id` | Juez por ID |
| `POST` | `/jueces` | Crear nuevo juez |
| `PATCH` | `/jueces/:id` | Actualizar juez |
| `DELETE` | `/jueces/:id` | Eliminar juez |

### 📊 Meta Resúmenes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/jueces/meta-resumen/:anio/:mes/:instanciaId` | Meta resúmenes por instancia |
| `GET` | `/jueces/meta-resumenes` | Todos los meta resúmenes |

### 🏢 Instancias

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/instancias` | Todas las instancias |
| `GET` | `/instancias/activas` | Instancias activas |
| `GET` | `/instancias/:id` | Instancia por ID |

### 👥 Usuarios

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/usuarios` | Todos los usuarios |
| `GET` | `/usuarios/:id` | Usuario por ID |

## 📁 Estructura del Proyecto

```
justibot-api/
├── src/
│   ├── conector/                 # Módulo de conexión a BD
│   │   ├── entities/            # Entidades TypeORM
│   │   └── conector.module.ts
│   ├── estadisticas/            # Módulo principal
│   │   ├── controllers/         # Controladores REST
│   │   ├── services/           # Lógica de negocio
│   │   ├── dto/                # Data Transfer Objects
│   │   └── estadisticas.module.ts
│   ├── app.module.ts           # Módulo principal
│   └── main.ts                 # Punto de entrada
├── test/                       # Tests
├── package.json
└── README.md
```

## 🗄️ Base de Datos

### Entidades Principales

#### 👨‍⚖️ Jueces (`mae_est_jueces`)
- `n_id_juez` - ID único del juez
- `l_activo` - Estado activo/inactivo
- `usuario_id` - Referencia al usuario
- `n_id_juez_tipo_id` - Tipo de juez

#### 🏢 Instancias (`mae_est_instancia`)
- `n_instancia_id` - ID único de la instancia
- `x_nom_instancia` - Nombre de la instancia
- `c_distrito` - Código del distrito
- `c_provincia` - Código de la provincia

#### 📊 Meta Resúmenes (`mae_est_meta_resumenes_modificado`)
- `n_id_meta_resumen_mod` - ID único del resumen
- `n_instancia_id` - Referencia a la instancia
- `n_anio_est` - Año del resumen
- `n_mes_est` - Mes del resumen
- `m_t_resuelto` - Total resuelto
- `m_avan_meta` - Avance de meta

## 🚀 Desarrollo

### Comandos disponibles

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
npm run test:cov

# Linting
npm run lint
npm run lint:fix
```

### Ejemplos de Uso

#### Obtener jueces con meta resúmenes
```bash
GET /jueces/con-meta-resumenes/2025/10
```

#### Obtener meta resúmenes por instancia
```bash
GET /jueces/meta-resumen/2025/10/250017
```

#### Respuesta de ejemplo
```json
{
  "n_id_juez": 1,
  "x_nombres": "Juan Carlos",
  "x_app_paterno": "Pérez",
  "x_app_materno": "García",
  "x_nom_instancia": "1° JUZGADO LABORAL",
  "m_t_resuelto": 349,
  "m_avan_meta": 85.5,
  "tiene_meta_resumen": true
}
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Cobertura de tests
npm run test:cov
```

## 📚 Documentación API

La documentación automática está disponible en:
- **Swagger UI**: `http://localhost:5002/api`
- **JSON Schema**: `http://localhost:5002/api-json`

## 🔧 Configuración Avanzada

### Base de Datos

```typescript
// src/conector/conector.module.ts
TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [/* entidades */],
  synchronize: false, // En producción usar migraciones
})
```

### Validación

Los DTOs incluyen validación automática:

```typescript
export class CreateJuezDto {
  @IsString()
  @IsNotEmpty()
  l_activo: string;

  @IsNumber()
  usuario_id: number;
}
```

## 🚀 Despliegue

### Producción

1. **Configurar variables de entorno**
2. **Ejecutar migraciones de BD**
3. **Build del proyecto**
4. **Iniciar la aplicación**

```bash
npm run build
npm run start:prod
```

### Docker (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5002
CMD ["node", "dist/main"]
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👥 Equipo

- **Desarrollador Principal**: [Tu Nombre]
- **Email**: tu.email@ejemplo.com
- **GitHub**: [@tuusuario](https://github.com/tuusuario)

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa la [documentación](https://docs.nestjs.com)
2. Busca en [Issues existentes](../../issues)
3. Crea un [nuevo issue](../../issues/new)

---

<div align="center">
  <p>Hecho con ❤️ para el Sistema Judicial</p>
  <p>© 2024 JustiBot API. Todos los derechos reservados.</p>
</div>