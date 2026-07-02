# Parcial 2 - Aplicaciones Hibridas

Proyecto para la materia Aplicaciones Hibridas. Es un sistema para manejar proyectos y clientes (tipo un dashboard), con login y registro de usuarios. Las contraseñas se guardan encriptadas y se usa JWT para el login.

Hice el backend con Node, Express y MongoDB, y el frontend con React (Vite).

## Como levantar el proyecto

Son 2 carpetas separadas, backend y my-react-app. Hay que correr las dos al mismo tiempo en 2 terminales distintas.

### Backend

```
cd backend
npm install
npm run dev
```

Necesita el archivo .env con esto (lo mando aparte):
```
PORT=3333
MONGO_URI=...
JWT_SECRET=...
```

Se levanta en el puerto 3333.

### Frontend

```
cd my-react-app
npm install
npm run dev
```

Se levanta con Vite, normalmente en localhost:5173.

## Como usarlo

Entras a la pagina, te registras, haces login y ya podes agregar/editar/borrar proyectos y clientes. Si no iniciaste sesion solo podes ver los proyectos, no tocar nada.

## Rutas del backend

- POST /api/auth/register - registrarse
- POST /api/auth/login - login
- GET /api/projects - ver proyectos
- POST /api/projects - crear proyecto (necesita login)
- PUT /api/projects/:id - editar proyecto (necesita login)
- DELETE /api/projects/:id - borrar proyecto (necesita login)
- GET /api/clients - ver clientes
- POST /api/clients - crear cliente (necesita login)
- DELETE /api/clients/:clientId - borrar cliente (necesita login)

## Autor

Parshant Kumar - Diseño y Programación Web