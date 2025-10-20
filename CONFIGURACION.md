# Configuración del Módulo de Estadísticas

## Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

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
```

## Endpoints Disponibles

### Meta Resúmenes Modificados
- `GET /meta-resumenes` - Obtener todos los registros
- `GET /meta-resumenes/:id` - Obtener por ID
- `GET /meta-resumenes/anio-mes?anio=2024&mes=1` - Buscar por año y mes
- `GET /meta-resumenes/instancia/:instanciaId` - Buscar por instancia
- `POST /meta-resumenes` - Crear nuevo registro
- `PATCH /meta-resumenes/:id` - Actualizar registro
- `DELETE /meta-resumenes/:id` - Eliminar registro

### Instancia Jueces
- `GET /instancia-jueces` - Obtener todos los registros
- `GET /instancia-jueces/:id` - Obtener por ID
- `GET /instancia-jueces/activos` - Obtener registros activos
- `GET /instancia-jueces/juez/:juezId` - Buscar por juez
- `GET /instancia-jueces/instancia/:instanciaId` - Buscar por instancia
- `POST /instancia-jueces` - Crear nuevo registro
- `PATCH /instancia-jueces/:id` - Actualizar registro
- `DELETE /instancia-jueces/:id` - Eliminar registro

### Jueces
- `GET /jueces` - Obtener todos los registros
- `GET /jueces/:id` - Obtener por ID
- `GET /jueces/activos` - Obtener registros activos
- `GET /jueces/usuario/:usuarioId` - Buscar por usuario
- `GET /jueces/tipo/:tipoId` - Buscar por tipo
- `POST /jueces` - Crear nuevo registro
- `PATCH /jueces/:id` - Actualizar registro
- `DELETE /jueces/:id` - Eliminar registro

### Tipos de Juez
- `GET /juez-tipos` - Obtener todos los registros
- `GET /juez-tipos/:id` - Obtener por ID
- `GET /juez-tipos/buscar?descripcion=texto` - Buscar por descripción
- `POST /juez-tipos` - Crear nuevo registro
- `PATCH /juez-tipos/:id` - Actualizar registro
- `DELETE /juez-tipos/:id` - Eliminar registro

### Usuarios
- `GET /usuarios` - Obtener todos los registros
- `GET /usuarios/:id` - Obtener por ID
- `GET /usuarios/activos` - Obtener usuarios activos
- `GET /usuarios/username/:username` - Buscar por nombre de usuario
- `GET /usuarios/email/:email` - Buscar por email
- `GET /usuarios/dni/:dni` - Buscar por DNI
- `GET /usuarios/sexo/:sexoId` - Buscar por sexo
- `POST /usuarios` - Crear nuevo registro
- `PATCH /usuarios/:id` - Actualizar registro
- `DELETE /usuarios/:id` - Eliminar registro

### Sexos
- `GET /sexos` - Obtener todos los registros
- `GET /sexos/:id` - Obtener por ID
- `GET /sexos/buscar?descripcion=texto` - Buscar por descripción
- `POST /sexos` - Crear nuevo registro
- `PATCH /sexos/:id` - Actualizar registro
- `DELETE /sexos/:id` - Eliminar registro

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Crear archivo `.env` en la raíz del proyecto con:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root1234@
DB_DATABASE=csjsanta_indicadores
NODE_ENV=development
PORT=3000
```

3. Ejecutar la aplicación:
```bash
npm run start:dev
```

La aplicación estará disponible en `http://localhost:3000`

## ✅ Configuración de Base de Datos

- **Host**: localhost
- **Puerto**: 3306
- **Usuario**: root
- **Contraseña**: root1234@
- **Base de Datos**: csjsanta_indicadores
