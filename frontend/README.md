# Rockola - Frontend

## Descripción
Rockola es una aplicación web moderna para gestión y reproducción de música, desarrollada con React, TypeScript y Vite. Permite a los usuarios buscar canciones, crear listas de reproducción y controlar su experiencia musical.

## Tecnologías Principales
- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- ESLint + Prettier

## Requisitos Previos
- Node.js (versión 14.18.0 o superior)
- npm (incluido con Node.js)

## Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd rockola/frontend
```

2. Instalar dependencias:
```bash
npm install
```

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Compila el proyecto para producción
- `npm run lint`: Ejecuta el linter para verificar el código
- `npm run lint:fix`: Corrige automáticamente los problemas de linting
- `npm run preview`: Previsualiza la versión de producción
- `npm run format`: Formatea el código usando Prettier

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
│   ├── App.tsx
│   └── main.tsx
├── public/
├── index.html
└── package.json
```

## Configuración de Desarrollo

### ESLint
El proyecto utiliza ESLint con las siguientes configuraciones:
- typescript-eslint
- react-hooks
- prettier

### Prettier
Configuración personalizada para mantener un estilo de código consistente:
- Sin punto y coma al final
- Comillas simples
- 2 espacios de indentación

## Despliegue
Para construir la aplicación para producción:

1. Ejecutar el build:
```bash
npm run build
```

2. Los archivos de distribución se generarán en la carpeta `dist/`

## Contribución
1. Crear una rama para la nueva funcionalidad
2. Realizar cambios siguiendo las guías de estilo
3. Ejecutar linting y tests
4. Crear Pull Request

## Licencia
Todos los derechos reservados © 2024 Rockola

## Contacto
[Información de contacto del equipo de desarrollo]