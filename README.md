# tp-rutas-autenticacion
Trabajo práctico de Desarrollo Web con rutas públicas, privadas y protegidas por rol
## Cómo ejecutar el proyecto

```bash
cd backend
npm ci
node server.js
```

Abrir http://localhost:3000 en el navegador.

| Ruta | Acceso |
| --- | --- |
| `/api/publica` | Cualquier visitante |
| `/api/privada` | Usuarios con sesión iniciada |
| `/api/admin` | Usuarios con sesión iniciada y rol `admin` |

Cuentas de prueba: `alumno` / `alumno123` y `admin` / `admin123`.