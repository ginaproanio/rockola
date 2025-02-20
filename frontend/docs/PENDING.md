# Warnings Pendientes - ESLint

## Fecha: 2024-03-XX

### Warnings Detectados

#### Componentes de Autenticación
- [x] `AuthContext.tsx`: 
  - Resolver tipos `any` en el contexto de autenticación
  - Implementar interfaces específicas para el estado y acciones

#### Componentes de UI
- [x] `Login.tsx`:
  - Revisar tipos en eventos de formulario
  - Implementar manejo de errores tipado

#### Páginas
- [x] `Playlist.tsx`:
  - ~~Eliminar imports no utilizados (useEffect)~~ [Resuelto: useEffect está en uso]
  - ~~Revisar estado setCurrentPlaylist no utilizado~~ [Resuelto: usado en loadPlaylist]
  - ~~Implementar tipos para la lista de reproducción~~ [Resuelto: usando tipo Song]

#### Servicios
- [x] `api.ts`:
  - ~~Tipar respuestas de endpoints~~ [Resuelto: interfaces añadidas]
  - ~~Implementar manejo de errores tipado~~ [Resuelto: ApiError implementado]

## Plan de Acción

1. Prioridad Alta
   - [x] Implementar interfaces para AuthContext
   - [x] Corregir tipos en formularios de Login

2. Prioridad Media
   - [x] Limpiar código no utilizado en Playlist
   - [x] Implementar tipos en servicios API

3. Prioridad Baja
   - [ ] Optimizar imports
   - [x] Revisar warnings de react-refresh

## Notas Adicionales
- Los warnings no afectan la funcionalidad actual
- Se requiere actualizar tests después de implementar los tipos
