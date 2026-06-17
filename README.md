# MuniDigital - Plataforma de Trámites Municipales

## Integrantes

* Ariel Carrasco
* Benjamín Peredo
* Diego Valenzuela

---

# Descripción del Proyecto

MuniDigital es una aplicación web y móvil desarrollada con Ionic y React que busca mejorar el acceso a los trámites municipales en Chile.

La plataforma permite a los ciudadanos:

* Registrarse e iniciar sesión en el sistema.
* Consultar trámites municipales disponibles.
* Revisar horarios disponibles para cada trámite.
* Reservar horas de atención.
* Recibir confirmación de reserva por correo electrónico.
* Visualizar y gestionar sus reservas.
* Consultar información de oficinas municipales.

Los administradores pueden además:

* Crear, editar y eliminar oficinas.
* Gestionar trámites desde el panel de administración.

---

# Problema

Actualmente muchos municipios presentan procesos poco digitalizados, obligando a los ciudadanos a realizar trámites de forma presencial o enfrentar largos tiempos de espera para obtener atención.

MuniDigital busca simplificar este proceso mediante una plataforma centralizada de gestión de trámites.

---

# Usuario Objetivo

## Usuario Principal

* Ciudadanos mayores de 18 años.
* Personas que necesitan realizar trámites municipales.
* Usuarios con acceso a dispositivos móviles o computadores.

## Usuario Secundario

* Administradores municipales con acceso al panel de gestión.

---

# Arquitectura

El proyecto implementa tres patrones de arquitectura:

## Clean Architecture

Separación por responsabilidades en capas: presentación, dominio y datos.

## Feature-Based Architecture

El sistema se organiza por dominios funcionales (`auth`, `tramites`, `reservas`, `oficinas`, `admin`), tanto en frontend como en backend.

## Component-Based Architecture

La UI se compone de piezas reutilizables organizadas en `core/presentation/components`.

---

# Funcionalidades Implementadas

## Autenticación

* Registro de usuarios con validación de RUT chileno, correo y contraseña.
* Inicio de sesión mediante correo y contraseña.
* Inicio de sesión mediante Clave Única (simulada).
* Encriptación de contraseñas con bcrypt.
* Generación y validación de tokens JWT.
* Protección de rutas privadas en frontend.
* Diferenciación de roles (usuario / admin).

## Trámites

* Visualización paginada de trámites disponibles.
* Consulta de información detallada con requisitos.

## Horarios

* Consulta dinámica de horarios disponibles.
* Actualización automática de disponibilidad al reservar.

## Reservas

* Creación de reservas con validación de duplicados.
* Envío automático de correo de confirmación vía EmailJS.
* Almacenamiento local de reservas con Capacitor Preferences.
* Visualización de reservas en página "Mis Reservas".
* Detalle de reserva confirmada.
* Liberación de horarios al eliminar reservas.

## Oficinas

* Consulta de oficinas municipales desde base de datos.
* Panel de administración para crear, editar y eliminar oficinas (solo admin).

## Seguridad

* Helmet para protección de headers HTTP.
* Rate limiting: 100 peticiones/15min general, 10 intentos/15min en autenticación.
* CORS restrictivo (solo dominios permitidos).
* Límite de tamaño de body (10kb).
* Consultas SQL parametrizadas (protección SQL Injection).
* Middleware de roles (verificarToken, verificarAdmin).

---

# Arquitectura de Navegación

## Rutas Públicas

* `/login`
* `/register`
* `/clave-unica`

## Rutas Protegidas (usuario autenticado)

* `/home`
* `/tramites`
* `/detalle/:id`
* `/horarios/:id`
* `/reserva/:id`
* `/oficinas`
* `/mis-reservas`

## Rutas de Admin

* `/admin`
* `/admin/oficinas`

---

# Estructura del Proyecto

```
Proyecto-Web-y-Movil-23/
  src/                        # Frontend (Ionic React)
    core/
      presentation/
        components/           # NavBar y componentes globales
        hooks/                # useToast, useStorage
      router/                 # App.tsx, PrivateRoute, AdminRoute
      theme/                  # variables.css
    features/
      auth/
        presentation/screens/ # Login, Register, ClaveUnica
        data/                 # authService.ts
      tramites/
        presentation/screens/ # Tramites, Detalle
      reservas/
        presentation/screens/ # Horarios, DetalleReserva, MisReservas
        data/                 # horariosService.ts
      oficinas/
        presentation/screens/ # Oficinas
        data/                 # oficinasService.ts
      admin/
        presentation/screens/ # AdminPanel, AdminOficinas
      home/
        presentation/screen/  # Home, NotFound

  backend/
    src/
      core/
        config/               # db.js
        middleware/           # authMiddleware, roleMiddleware
        server/               # app.js, server.js
      features/
        auth/                 # authRoutes.js
        tramites/             # tramitesRoutes.js
        horarios/             # horariosRoutes.js
        reservas/             # reservasRoutes.js
        oficinas/             # oficinasRoutes.js
```

---

# Base de Datos

La aplicación utiliza PostgreSQL. El esquema completo se encuentra en `backend/database.sql`.

## Tablas

* **usuarios** — id_usuario, nombre, apellido, correo, rut, password_hash, rol
* **tramites** — id_tramite, titulo, descripcion, duracion, modalidad, ubicacion
* **horarios** — id_horario, id_tramite, fecha, hora, disponible
* **reservas** — id_reserva, id_usuario, id_tramite, id_horario, estado, creado_en
* **oficinas** — id_oficina, nombre, direccion, horario, telefono
* **requisitos** — id_requisito, id_tramite, icono, texto
* **roles** — id_rol, nombre

## Índices

```sql
CREATE INDEX IF NOT EXISTS idx_usuarios_correo ON usuarios(correo);
CREATE INDEX IF NOT EXISTS idx_usuarios_rut ON usuarios(rut);
CREATE INDEX IF NOT EXISTS idx_reservas_id_usuario ON reservas(id_usuario);
CREATE INDEX IF NOT EXISTS idx_reservas_id_tramite ON reservas(id_tramite);
CREATE INDEX IF NOT EXISTS idx_horarios_id_tramite ON horarios(id_tramite);
CREATE INDEX IF NOT EXISTS idx_horarios_disponible ON horarios(disponible);
```

---

# API REST

## Autenticación `/api/auth`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | /register | Registrar usuario | No |
| POST | /login | Iniciar sesión | No |
| POST | /claveunica | Login con Clave Única | No |

## Trámites `/api/tramites`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | / | Listar trámites (paginado) | No |
| GET | /:id | Detalle de trámite | No |
| POST | / | Crear trámite | Admin |
| PUT | /:id | Actualizar trámite | Admin |
| DELETE | /:id | Eliminar trámite | Admin |

## Horarios `/api/horarios`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | /:id_tramite | Horarios de un trámite | No |
| PUT | /:id_horario | Actualizar disponibilidad | No |

## Reservas `/api/reservas`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | / | Crear reserva | Sí |
| GET | /:id_usuario | Reservas de un usuario | Sí |
| GET | /detalle/:id | Detalle de reserva | Sí |
| DELETE | /:id | Eliminar reserva | Sí |

## Oficinas `/api/oficinas`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| GET | / | Listar oficinas | No |
| GET | /:id | Detalle de oficina | No |
| POST | / | Crear oficina | Admin |
| PUT | /:id | Actualizar oficina | Admin |
| DELETE | /:id | Eliminar oficina | Admin |

---

# Tecnologías Utilizadas

## Frontend

* Ionic
* React
* TypeScript
* React Router
* Axios
* EmailJS (confirmación de reservas por correo)
* Capacitor Preferences (almacenamiento local)

## Backend

* Node.js 18+
* Express
* Helmet
* express-rate-limit
* bcrypt
* jsonwebtoken

## Base de Datos

* PostgreSQL 15

## Despliegue

* Docker
* Docker Compose

## Herramientas

* Git / GitHub
* Postman
* Visual Studio Code

---

# Instalación y Ejecución

## Opción 1 — Con Docker (recomendado)

### Requisitos

* Docker Desktop instalado y corriendo

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/claapii/Proyecto-Web-y-Movil-23.git
cd Proyecto-Web-y-Movil-23

# Levantar todos los servicios
docker-compose up --build
```

Esto levanta automáticamente:

* Base de datos PostgreSQL en el puerto 5432
* Backend en http://localhost:3000
* Frontend en http://localhost:5173

---

## Opción 2 — Instalación Manual

### Requisitos

* Node.js 18+
* PostgreSQL instalado y corriendo
* Ionic CLI (`npm install -g @ionic/cli`)

### Base de datos

1. Crear la base de datos `municipalidad_db` en PostgreSQL.
2. Ejecutar el archivo `backend/database.sql` en pgAdmin o psql.

### Backend

```bash
cd backend
npm install
```

Crear el archivo `.env` en la carpeta `backend` con:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=municipalidad_db
JWT_SECRET=tu_clave_secreta
```

Iniciar el backend:

```bash
npm start
```

### Frontend

```bash
# Desde la raíz del proyecto
npm install
ionic serve
```

La app estará disponible en http://localhost:8100

---

# Variables de Entorno

## Backend (`backend/.env`)

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto del servidor (3000) |
| DB_HOST | Host de PostgreSQL |
| DB_PORT | Puerto de PostgreSQL (5432) |
| DB_USER | Usuario de PostgreSQL |
| DB_PASSWORD | Contraseña de PostgreSQL |
| DB_NAME | Nombre de la base de datos |
| JWT_SECRET | Clave secreta para JWT |

## Frontend (`.env`)

| Variable | Descripción |
|----------|-------------|
| VITE_API_URL | URL base del backend |
| VITE_EMAILJS_SERVICE_ID | Service ID de EmailJS |
| VITE_EMAILJS_TEMPLATE_ID | Template ID de EmailJS |
| VITE_EMAILJS_PUBLIC_KEY | Public Key de EmailJS |

---

# Estado Actual

Implementación correspondiente a la Entrega Final:

* API REST desarrollada con Express y arquitectura feature-based.
* Integración con PostgreSQL con índices optimizados y paginación.
* Sistema de autenticación mediante JWT con roles.
* Protección de rutas privadas y de administrador.
* CRUD completo de oficinas con panel de administración.
* Notificaciones con Toast en toda la aplicación.
* Almacenamiento local de reservas con Capacitor Preferences.
* Confirmación de reservas por correo electrónico (EmailJS).
* Seguridad avanzada con Helmet, rate limiting y CORS restrictivo.
* Despliegue con Docker y Docker Compose.
* Página 404 y mejoras generales de UI/UX.