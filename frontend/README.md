# Rockola - Frontend

## Descripción
Rockola es una aplicación web para gestión y reproducción de música, desarrollada con React, TypeScript y Vite. Permite a los usuarios buscar canciones, crear listas de reproducción y controlar su experiencia musical.

## Estado Actual
- ✅ Configuración inicial del proyecto
- ✅ Estructura base de componentes
- ✅ Sistema de routing implementado
- ✅ Layout principal con Header y Footer

## Tecnologías
- React 18
- TypeScript
- Vite
- React Router DOM v6
- Axios
- ESLint + Prettier

## Requisitos
- Node.js (versión 14.18.0 o superior)
- npm (incluido con Node.js)

## Instalación y Ejecución

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd rockola
```

2. Cambiar al branch de desarrollo:
```bash
git checkout feature/frontend-setup
```

3. Instalar dependencias:
```bash
cd frontend
npm install
```

4. Iniciar servidor de desarrollo:
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Scripts Disponibles
- `npm run dev`: Inicia el servidor de desarrollo con Vite (http://localhost:5173)
- `npm run build`: Compila el proyecto para producción (ejecuta TypeScript + Vite build)
- `npm run lint`: Ejecuta ESLint para verificar el código TypeScript/TSX (con máximo 0 warnings)
- `npm run lint:fix`: Corrige automáticamente los problemas de linting que sean posibles
- `npm run preview`: Previsualiza la versión de producción localmente
- `npm run format`: Formatea el código usando Prettier (archivos .ts y .tsx)

## Estructura del Proyecto
```
frontend/
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       └── Layout.tsx
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   └── Playlist.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   └── main.tsx
└── [archivos de configuración]
```

## Configuración de Desarrollo
El proyecto utiliza:
- ESLint para linting
- Prettier para formateo de código
- TypeScript para tipado estático
- Vite como bundler y servidor de desarrollo

## Control de Versiones
- Branch principal: `master`
- Branch de desarrollo: `feature/frontend-setup`

## Próximos Pasos
- [ ] Implementar integración con API
- [ ] Desarrollar funcionalidad de búsqueda
- [ ] Crear componentes de reproducción de música
- [ ] Implementar gestión de listas de reproducción

## Licencia
Todos los derechos reservados © 2024 Rockola

## Contacto
[Información de contacto del equipo de desarrollo]
