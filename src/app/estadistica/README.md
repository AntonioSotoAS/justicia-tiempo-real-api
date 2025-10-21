# Módulo de Estadísticas

Este módulo se conecta a una API externa para obtener datos de estadísticas judiciales usando autenticación básica.

## Configuración

El módulo está configurado para conectarse a:
- **URL Base**: `http://localhost:8000/est/metas/cuadro-anual/api/`
- **Usuario**: `lmanco`
- **Contraseña**: `admin`
- **Autenticación**: Basic Auth

## Endpoints Disponibles

### 1. Obtener Cuadro Anual (con parámetros opcionales)
```
GET /estadistica/cuadro-anual?year=2025&month=10
```

### 2. Obtener Cuadro Anual Actual
```
GET /estadistica/cuadro-anual/actual
```

### 3. Obtener Cuadro Anual por Año
```
GET /estadistica/cuadro-anual/2025
```

## Estructura de Respuesta

La API devuelve un objeto con la siguiente estructura:

```typescript
{
  anio: number;
  mes_actual: number;
  meses: string[];
  filas: FilaDto[];
  total_filas: number;
  fecha_consulta: string;
}
```

Cada fila contiene información sobre:
- Organización jurisdiccional
- Instancia
- Jueces
- Estándares y metas
- Porcentajes de avance
- Niveles de productividad
- Datos mensuales (res_cells, ing_cells)

## Uso

```typescript
// Inyectar el servicio
constructor(private readonly estadisticaService: EstadisticaService) {}

// Obtener datos actuales
const datos = await this.estadisticaService.getCuadroAnualActual();

// Obtener datos para año específico
const datos2025 = await this.estadisticaService.getCuadroAnualPorAnio(2025);

// Obtener datos para año y mes específico
const datosOctubre2025 = await this.estadisticaService.getCuadroAnualPorAnioYMes(2025, 10);
```

## Logs

El módulo incluye logging detallado para:
- Solicitudes de datos
- Errores de conexión
- Respuestas exitosas

Los logs se pueden ver en la consola del servidor.
