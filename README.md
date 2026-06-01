# MuniDigital - Plataforma de Trámites Municipales

## Integrantes

* Ariel Carrasco
* Benjamín Peredo
* Diego Valenzuela

---

# Entrega Parcial 2

## Objetivo

Implementar la integración entre frontend y backend mediante una API REST desarrollada con Node.js y Express, conectada a una base de datos PostgreSQL, incorporando autenticación basada en JWT y consumo de servicios desde Ionic + React.

---

# Descripción del Proyecto

MuniDigital es una aplicación web desarrollada con Ionic y React que busca mejorar el acceso a los trámites municipales en Chile.

La plataforma permite a los ciudadanos:

* Registrarse en el sistema.
* Iniciar sesión.
* Consultar trámites municipales.
* Revisar horarios disponibles.
* Reservar horas de atención.
* Visualizar el detalle de sus reservas.

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

* Funcionarios municipales (considerados para futuras versiones del sistema).

---

# Funcionalidades Implementadas

## Autenticación

* Registro de usuarios.
* Inicio de sesión mediante correo y contraseña.
* Inicio de sesión mediante Clave Única (simulada).
* Encriptación de contraseñas mediante bcrypt.
* Generación de tokens JWT.
* Protección de rutas privadas.

## Trámites

* Visualización de trámites disponibles.
* Consulta de información detallada.
* Visualización de requisitos asociados.

## Horarios

* Consulta dinámica de horarios disponibles.
* Actualización automática de disponibilidad.

## Reservas

* Creación de reservas.
* Validación para impedir reservas duplicadas del mismo trámite.
* Visualización del detalle de reserva.
* Liberación de horarios al eliminar reservas.

## Oficinas

* Consulta de oficinas municipales.
* Visualización de información asociada a cada oficina.

---

# Arquitectura de Navegación

## Rutas Públicas

* `/login`
* `/register`
* `/clave-unica`

## Rutas Protegidas

* `/home`
* `/tramites`
* `/detalle/:id`
* `/horarios/:id`
* `/reserva/:id`
* `/oficinas`

---

# Arquitectura Backend

El backend fue desarrollado utilizando Express y se encuentra organizado mediante módulos especializados:

* `authRoutes`
* `tramitesRoutes`
* `horariosRoutes`
* `reservasRoutes`
* `oficinasRoutes`

La autenticación se realiza mediante middleware JWT.

Adicionalmente, existen middleware orientados al control de permisos por rol para futuras funcionalidades administrativas.

---

# Base de Datos

La aplicación utiliza PostgreSQL como sistema gestor de base de datos.

## Tablas Principales

### usuarios

* id_usuario
* nombre
* apellido
* correo
* rut
* password_hash
* rol

### tramites

* id_tramite
* titulo
* descripcion
* duracion
* modalidad
* ubicacion

### horarios

* id_horario
* id_tramite
* fecha
* hora
* disponible

### reservas

* id_reserva
* id_usuario
* id_tramite
* id_horario
* estado

### oficinas

* id_oficina
* nombre
* direccion
* horario
* telefono

### requisitos

* id_requisito
* id_tramite
* icono
* texto

---

# API REST Implementada

## Autenticación

### POST `/api/auth/register`

Registrar un nuevo usuario.

### POST `/api/auth/login`

Iniciar sesión.

### POST `/api/auth/claveunica`

Iniciar sesión mediante Clave Única.

---

## Trámites

### GET `/api/tramites`

Obtener todos los trámites.

### GET `/api/tramites/:id`

Obtener detalle de un trámite.

### POST `/api/tramites`

Crear trámite.

### PUT `/api/tramites/:id`

Actualizar trámite.

### DELETE `/api/tramites/:id`

Eliminar trámite.

> Los endpoints de creación, actualización y eliminación se encuentran implementados en backend y protegidos mediante control de permisos, pero aún no poseen interfaz gráfica dentro de la aplicación.

---

## Horarios

### GET `/api/horarios/:id_tramite`

Obtener horarios disponibles.

### PUT `/api/horarios/:id_horario`

Actualizar disponibilidad de un horario.

---

## Reservas

### POST `/api/reservas`

Crear reserva.

### GET `/api/reservas/detalle/:id`

Obtener detalle de una reserva.

### GET `/api/reservas/:id_usuario`

Obtener reservas asociadas a un usuario.

### DELETE `/api/reservas/:id`

Eliminar una reserva.

> La eliminación de reservas se encuentra implementada en backend, pero aún no posee interfaz gráfica para el usuario final.

---

## Oficinas

### GET `/api/oficinas`

Obtener todas las oficinas.

### GET `/api/oficinas/:id`

Obtener una oficina específica.

### POST `/api/oficinas`

Crear oficina.

### PUT `/api/oficinas/:id`

Actualizar oficina.

### DELETE `/api/oficinas/:id`

Eliminar oficina.

> Los endpoints administrativos de oficinas se encuentran implementados y protegidos mediante control de permisos, pero aún no poseen interfaz gráfica dentro de la aplicación.

---

# Seguridad Implementada

* Contraseñas almacenadas mediante bcrypt.
* Tokens JWT con expiración.
* Middleware de validación de token.
* Protección de rutas privadas en frontend.
* Consultas SQL parametrizadas para prevenir SQL Injection.
* Validaciones de entrada en backend.
* Preparación para control de permisos por rol.

---

# Tecnologías Utilizadas

## Frontend

* Ionic
* React
* TypeScript
* React Router
* Axios

## Backend

* Node.js
* Express

## Base de Datos

* PostgreSQL

## Seguridad

* JWT
* bcrypt

## Herramientas

* Git
* GitHub
* Postman
* Visual Studio Code

---

# Instalación

## Clonar repositorio

```bash
git clone https://github.com/claapii/Proyecto-Web-y-Movil-23.git
```

## Instalar dependencias

```bash
npm install
```

## Ejecutar Frontend

```bash
ionic serve
```

## Ejecutar Backend

```bash
npm start
```

---

# Estado Actual

Implementación correspondiente a la Entrega Parcial 2:

* API REST desarrollada con Express.
* Integración con PostgreSQL.
* Sistema de autenticación mediante JWT.
* Protección de rutas privadas.
* Consumo de API mediante Axios.
* Gestión de usuarios.
* Gestión de trámites.
* Gestión de horarios.
* Gestión de reservas.
* Integración frontend y backend completada.

---

# Funcionalidades Consideradas para la Entrega Final

* Historial de reservas por usuario.
* Modificación de reservas.
* Cancelación de reservas desde interfaz gráfica.
* Implementación completa del panel administrativo.
* Gestión visual de horarios por administrador.
* Gestión de solicitudes administrativas.
* Mejoras de experiencia de usuario.
* Despliegue de la aplicación.
