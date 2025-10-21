# Módulo de Solicitudes

Este módulo maneja las solicitudes/mensajes del sistema con todos los campos requeridos.

## Campos de la Entidad

- **mMetaPreliminar**: Meta preliminar (texto)
- **mTResueltos**: Tareas resueltas (texto)
- **mAvanMeta**: Avance de meta (texto)
- **NivProduc**: Nivel de productividad (texto)
- **encuesta_retroalimentacion**: Encuesta de retroalimentación (texto)
- **numero_consulta**: Número de consulta (varchar 50)
- **anexo_consulta**: Anexo de consulta (texto)
- **whatsapp_consulta**: WhatsApp de consulta (varchar 20)
- **numerojuez**: Número de juez (varchar 50)
- **nombresapellidsojuez**: Nombres y apellidos del juez (varchar 200)
- **instaciajuez**: Instancia del juez (varchar 100)
- **fecha**: Fecha de la solicitud (date)
- **hora**: Hora de la solicitud (time)
- **estado**: Estado de la solicitud (pendiente, error, enviado)
- **prioridad**: Prioridad de la solicitud (baja, media, alta, urgente)

## Endpoints Disponibles

### Públicos
- `POST /solicitudes` - Crear nueva solicitud

### Autenticados
- `GET /solicitudes` - Obtener todas las solicitudes
- `GET /solicitudes/estadisticas` - Obtener estadísticas
- `GET /solicitudes/:id` - Obtener solicitud por ID

### Solo Administradores
- `PATCH /solicitudes/:id` - Actualizar solicitud
- `PATCH /solicitudes/:id/estado` - Cambiar estado
- `PATCH /solicitudes/:id/prioridad` - Cambiar prioridad
- `DELETE /solicitudes/:id` - Eliminar solicitud

## Filtros de Consulta

- `GET /solicitudes?estado=pendiente` - Filtrar por estado
- `GET /solicitudes?prioridad=alta` - Filtrar por prioridad

## Estados Disponibles

- `pendiente` (por defecto)
- `error`
- `enviado`

## Prioridades Disponibles

- `baja`
- `media` (por defecto)
- `alta`
- `urgente`

## Ejemplo de Uso

```json
POST /solicitudes
{
  "mMetaPreliminar": "Meta inicial del proyecto",
  "mTResueltos": "Tareas completadas",
  "mAvanMeta": "Progreso actual",
  "NivProduc": "Alto",
  "encuesta_retroalimentacion": "Muy satisfecho",
  "numero_consulta": "CONS-001",
  "anexo_consulta": "Documento adjunto",
  "whatsapp_consulta": "+1234567890",
  "numerojuez": "JUEZ-001",
  "nombresapellidsojuez": "Juan Pérez García",
  "instaciajuez": "Primera Instancia Civil",
  "fecha": "2024-01-15",
  "hora": "14:30:00",
  "prioridad": "alta"
}
```
