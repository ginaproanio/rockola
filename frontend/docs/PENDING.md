# Warnings Pendientes - ESLint

## Fecha: 2024-03-XX

### Warnings Detectados

#### Componentes de Autenticación
- [ ] `AuthContext.tsx`: 
  - Resolver tipos `any` en el contexto de autenticación
  - Implementar interfaces específicas para el estado y acciones

#### Componentes de UI
- [ ] `Login.tsx`:
  - Revisar tipos en eventos de formulario
  - Implementar manejo de errores tipado

#### Páginas
- [ ] `Playlist.tsx`:
  - Eliminar imports no utilizados (useEffect)
  - Revisar estado setCurrentPlaylist no utilizado
  - Implementar tipos para la lista de reproducción

#### Servicios
- [ ] `api.ts`:
  - Tipar respuestas de endpoints
  - Implementar manejo de errores tipado

## Plan de Acción

1. Prioridad Alta
   - Implementar interfaces para AuthContext
   - Corregir tipos en formularios de Login

2. Prioridad Media
   - Limpiar código no utilizado en Playlist
   - Implementar tipos en servicios API

3. Prioridad Baja
   - Optimizar imports
   - Revisar warnings de react-refresh

## Notas Adicionales
- Los warnings no afectan la funcionalidad actual
- Se requiere actualizar tests después de implementar los tipos