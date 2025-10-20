# 🔗 Configuración de Múltiples Base de Datos

## 📋 Resumen

Tu aplicación ahora tiene **dos conexiones de base de datos separadas**:

1. **Base de Estadísticas** (`estadisticas`) - Solo lectura
2. **Tu Base Principal** (`default`) - Lectura/escritura

## 🗄️ Arquitectura de Base de Datos

### 📊 Base de Estadísticas (Solo Lectura)
- **Propósito**: Consultar datos de estadísticas judiciales
- **Conexión**: `estadisticas`
- **Entidades**: Jueces, Instancias, Meta Resúmenes, etc.
- **Operaciones**: Solo SELECT (consultas)

### 🏠 Tu Base Principal (Lectura/Escritura)
- **Propósito**: Tu aplicación principal
- **Conexión**: `default`
- **Entidades**: Users, Posts, Comments, etc.
- **Operaciones**: CRUD completo

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` basado en `env.example`:

```env
# Aplicación
PORT=5002
NODE_ENV=development

# Base de estadísticas (solo lectura)
ESTADISTICAS_DB_HOST=localhost
ESTADISTICAS_DB_PORT=3306
ESTADISTICAS_DB_USERNAME=root
ESTADISTICAS_DB_PASSWORD=tu_password_estadisticas
ESTADISTICAS_DB_DATABASE=csjsanta_indicadores

# Tu base principal (lectura/escritura)
MAIN_DB_HOST=localhost
MAIN_DB_PORT=3306
MAIN_DB_USERNAME=root
MAIN_DB_PASSWORD=tu_password_principal
MAIN_DB_DATABASE=justibot_main
```

## 🏗️ Estructura del Proyecto

```
src/
├── config/
│   └── database.config.ts      # Configuración de BD
├── conector/                   # Módulo de estadísticas
│   ├── entities/              # Entidades de estadísticas
│   └── conector.module.ts
├── estadisticas/              # Lógica de estadísticas
│   ├── controllers/
│   ├── services/
│   └── dto/
├── app/                       # Tu aplicación principal
│   ├── entities/             # Tus entidades
│   ├── users/               # Módulo de usuarios
│   └── app.module.ts
└── app.module.ts            # Módulo principal
```

## 🔧 Uso en Servicios

### Servicios de Estadísticas
```typescript
@Injectable()
export class MaeEstJuecesService {
  constructor(
    @InjectRepository(MaeEstJueces, 'estadisticas') // Conexión de estadísticas
    private readonly juecesRepository: Repository<MaeEstJueces>,
  ) {}
}
```

### Servicios de Tu Aplicación
```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User, 'default') // Conexión principal
    private readonly userRepository: Repository<User>,
  ) {}
}
```

## 📊 Endpoints Disponibles

### Estadísticas (Solo Lectura)
- `GET /jueces` - Jueces de estadísticas
- `GET /jueces/completos` - Jueces con datos completos
- `GET /jueces/meta-resumen/:anio/:mes/:instanciaId` - Meta resúmenes

### Tu Aplicación (CRUD Completo)
- `GET /users` - Tus usuarios
- `POST /users` - Crear usuario
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

## 🚀 Ventajas

1. **Separación de Responsabilidades**
   - Estadísticas: Solo consultas
   - Tu App: CRUD completo

2. **Seguridad**
   - Base de estadísticas: Solo lectura
   - Tu base: Control total

3. **Escalabilidad**
   - Bases independientes
   - Configuración flexible

4. **Mantenimiento**
   - Código organizado
   - Fácil de entender

## 🔍 Ejemplos de Uso

### Consultar Estadísticas
```typescript
// En un servicio de estadísticas
const jueces = await this.juecesRepository.find(); // Conexión 'estadisticas'
```

### Gestionar Tus Datos
```typescript
// En tu servicio
const user = await this.userRepository.save(newUser); // Conexión 'default'
```

## 📝 Notas Importantes

1. **Base de Estadísticas**: Solo para consultas, no modificar
2. **Tu Base Principal**: Para tu lógica de negocio
3. **Conexiones Independientes**: Cada una con su configuración
4. **Entidades Separadas**: No mezclar entidades entre conexiones

## 🛠️ Desarrollo

### Agregar Nueva Entidad a Tu App
1. Crear en `src/app/entities/`
2. Agregar al módulo con conexión `'default'`
3. Crear servicio y controlador

### Agregar Nueva Consulta de Estadísticas
1. Usar conexión `'estadisticas'`
2. Solo operaciones de lectura
3. Agregar al módulo de estadísticas

¡Tu aplicación ahora tiene una arquitectura limpia y separada! 🎉
