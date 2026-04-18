# MuniDigital - Plataforma de trámites municipales
Integrantes
+ Ariel Carrasco
+ Benjamín Peredo
+ Diego Valenzuela

## Objetivo de la Entrega Parcial 1
+ Definición del problam y usuario objetivo.
+ Identificación de requerimientos.
+ Diseño de la UX.
+ Arquitectura de navegación.
+ Implementación inicial del frontend con Ionic + React.

## Requerimientos del Sistema (EP 1.1)

### Funcionales
+ El sistema debe permitir a los usuarios seleccionar el tipo de trámite municipal que desean realizar.
+ El sistema debe mostrar la disponibilidad de horarios para cada trámite en tiempo real.
+ El sistema debe permitir agendar trámites municipales según la disponibilidad.
+ El sistema debe permitir modificar o cancelar reservas previamente realizadas.
+ El sistema debe mostrar el historial de trámites realizados por el usuario.
+ El sistema debe permitir a los usuarios visualizar el estado de sus solicitudes.
+ El sistema debe permitir a los administradores gestionar horarios, disponibilidad y solicitudes de los usuarios.

### NO Funcionales
+ Usabilidad: La interfaz debe ser intuitiva y fácil de usar.
+ Rendimiento: El sistema debe responder en tiempos adecuados.
+ Seguridad: Se debe proteger la información de los usuarios.

## Justificación del problema y análisis del usuario objetivo (EP 1.2)

### Descripción del proyecto
MuniDigital es una aplicación web y móvil desarrollada con Ionic y React que busca mejorar el acceso a los trámites municipales dentro ed Chile, permitiendo a los ciudadanos agendar y gestionar sus solicitudes de forma digital.

Esta solución surge como respuesta a la baja digitalización de los servicios municipales, donde muchos procesos aún requieren presencialidad o presentan largos tiempos de espera, afectando la UX.

### Usuario Objetivo
+ Ciudadanos mayores de 18 años.
+ Personas que necesitan realizar trámites municipales.
+ Usuarios con acceso a dispositivos móviles o web.
+ Funcionarios minucipales (Usuario secundario).

## Bocetos de UI/UX (EP 1.3)

## Arquitectura de navegación y UX (EP 1.4)
### (a) Rutas principales y secundarias

#### Rutas públicas
+ /login
+ /register

#### Rutas de usuario (protegidas)
+ /home
+ /tramites
+ /detalle-tramite/:id
+ /horarios/:id
+ /agendar/:id
+ /mis-tramites
+ /mis-tramites/:id (detalle/estado)

#### Rutas de administrador (protegidas)
+ /admin
+ /admin/horarios
+ /admin/solicitudes

### (b) Relaciones jerárquicas entre vistas
- **Aplicación**
  - General
    - Login
    - Register
  - **Usuario**
    - Home
      - Trámites
        - Detalle de trámite
          - Horarios
            - Agendar
      - Mis trámites
        - Detalle/estado
  - **Administrador**
    - Panel admin
      - Gestión de horarios
      - Gestión de solicitudes
### (c) Flujo de navegación entre funcionalidades
Flujo principal (usuario): Login → Home → Trámites → Detalle → Horarios → Agendar → Confirmación → Mis trámites

Flujos alternativos:
+ Modificar: Mis trámites → Detalle → Editar/Cancelar
+ Consulta de estado: Mis trámites → Detalle

Flujo administrador: Login → Admin → Gestionar horarios / solicitudes

### (d) Diferencia entre roles
Usuario: acceso a navegación de trámites, agendamiento y seguimiento.
Administrador: acceso exclusivo a panel de gestión (horarios y solicitudes).
Control de acceso: rutas protegidas con verificación de rol (login) y redirección automática.

### (e) Task Flow
**Tarea 1: Agendar trámite**
1. Ingresar al sistema.
2. Ver lista de trámites.
3. Seleccionar trámite.
4. Revisar horarios disponibles.
5. Confirmar reserva.

**Tarea 2: Gestionar reserva**
1. Ir a “Mis trámites”.
2. Seleccionar trámite.
3. Modificar o cancelar.

**Tarea 3: Administración**
1. Ingresar como admin.
2. Definir horarios disponibles.
3. Gestionar solicitudes.

### (f) Puntos críticos en la interacción.
+ Selección de trámite (debe ser clara y filtrable).
+ Visualización de horarios (tiempo real, evitar confusión).
+ Confirmación de agendamiento (feedback claro).
+ Gestión de reservas (acciones visibles y reversibles).
+ Control de acceso por rol (evitar accesos incorrectos).

### (g) Coherencia entre dispositivos
+ Móvil: navegación con barra inferior (tabs) y flujo simplificado.
+ Web: uso de menú lateral (sidebar) y mayor densidad de información.
+ Consistencia: mismas rutas y lógica, adaptando solo la disposición visual en cada dispositivo.

### (h) Justificación técnica de nuestras elecciones
+ Usabilidad: navegación basada en tareas reduce la carga cognitiva.
+ Eficiencia: rutas directas minimizan pasos innecesarios.
+ Claridad estructural: jerarquía definida facilita mantenimiento.
+ Escalabilidad: estructura modular permite agregar nuevas funcionalidades sin romper la arquitectura.
