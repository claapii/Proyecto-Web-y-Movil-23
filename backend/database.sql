/* =========================================================
   CREACIÓN DE TABLAS
========================================================= */

/* -------------------------
   TABLA USUARIOS
------------------------- */
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,

    correo VARCHAR(150) UNIQUE NOT NULL,
    rut VARCHAR(20) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    rol VARCHAR(20) DEFAULT 'usuario' NOT NULL
);

/* -------------------------
   TABLA TRÁMITES
------------------------- */
CREATE TABLE tramites (
    id_tramite SERIAL PRIMARY KEY,

    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT NOT NULL,

    duracion VARCHAR(50),
    modalidad VARCHAR(50),
    ubicacion VARCHAR(100)
);

/* -------------------------
   TABLA REQUISITOS
------------------------- */
CREATE TABLE requisitos (
    id_requisito SERIAL PRIMARY KEY,

    id_tramite INT NOT NULL,

    icono VARCHAR(20),
    texto VARCHAR(255) NOT NULL,

    FOREIGN KEY (id_tramite)
    REFERENCES tramites(id_tramite)
);

/* -------------------------
   TABLA RESERVAS
------------------------- */
CREATE TABLE reservas (

    id_reserva SERIAL PRIMARY KEY,

    id_usuario INT NOT NULL,
    id_tramite INT NOT NULL,
    id_horario INT NOT NULL,

    estado VARCHAR(20) DEFAULT 'pendiente',

    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_usuario
      FOREIGN KEY (id_usuario)
      REFERENCES usuarios(id_usuario),

    CONSTRAINT fk_tramite
      FOREIGN KEY (id_tramite)
      REFERENCES tramites(id_tramite),

    CONSTRAINT fk_horario
      FOREIGN KEY (id_horario)
      REFERENCES horarios(id_horario)
);

/* -------------------------
   TABLA HORARIOS
------------------------- */

CREATE TABLE horarios (

    id_horario SERIAL PRIMARY KEY,

    id_tramite INT NOT NULL,

    fecha DATE NOT NULL,

    hora TIME NOT NULL,

    disponible BOOLEAN DEFAULT true,

    FOREIGN KEY (id_tramite)
    REFERENCES tramites(id_tramite)
    ON DELETE CASCADE
);

/* -------------------------
   TABLA ROLES
------------------------- */
CREATE TABLE roles (
    id_rol SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);


/* -------------------------
   TABLA OFICINAS
------------------------- */
CREATE TABLE oficinas (
    id_oficina SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(150) NOT NULL,
    horario VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
);

/* =========================================================
   INSERTS - TRÁMITES
========================================================= */

INSERT INTO tramites
(titulo, descripcion, duracion, modalidad, ubicacion)
VALUES
(
  'LICENCIA DE CONDUCIR',
  'Este trámite permite solicitar o renovar la licencia de conducir en la municipalidad.',
  '30 minutos',
  'Presencial',
  'Oficina Municipal'
),
(
  'PERMISO DE CIRCULACIÓN',
  'Este trámite permite renovar u obtener el permiso de circulación.',
  '20 minutos',
  'Presencial y online',
  'Dirección de tránsito'
),
(
  'CERTIFICADOS MÉDICOS',
  'Solicita certificados médicos y documentos necesarios.',
  '15 minutos',
  'Presencial',
  'Centro médico municipal'
),
(
  'INSCRIPCIÓN PATENTE',
  'Realiza la inscripción de patente comercial.',
  '25 minutos',
  'Presencial',
  'Departamento de patentes'
);

/* =========================================================
   INSERTS - REQUISITOS
========================================================= */

INSERT INTO requisitos
(id_tramite, icono, texto)
VALUES
(1, '18+', 'Mayor de 18 años'),
(1, '🪪', 'Cédula vigente'),
(1, '🩺', 'Examen médico aprobado'),

(2, '🚗', 'Vehículo registrado'),
(2, '📄', 'Documentación al día'),
(2, '💳', 'Pago del permiso'),

(3, '🩺', 'Evaluación médica'),
(3, '🪪', 'Cédula vigente'),
(3, '📋', 'Solicitud del trámite'),

(4, '🏢', 'Dirección comercial'),
(4, '📄', 'Documentación legal'),
(4, '💼', 'Inicio de actividades');

/* =========================================================
   INSERTS - HORARIOS
========================================================= */

INSERT INTO horarios
(id_tramite, fecha, hora, disponible)
VALUES

/* Licencia de conducir */
(1, '2026-05-25', '09:00', true),
(1, '2026-05-25', '10:00', true),
(1, '2026-05-25', '11:00', true),
(1, '2026-05-25', '12:00', true),

(1, '2026-05-26', '09:30', true),
(1, '2026-05-26', '10:30', true),
(1, '2026-05-26', '11:30', true),

(1, '2026-05-27', '08:30', true),
(1, '2026-05-27', '09:30', true),
(1, '2026-05-27', '10:30', true),

/* Permiso de circulación */
(2, '2026-05-28', '14:00', true),
(2, '2026-05-28', '15:00', true),
(2, '2026-05-28', '16:00', true),

(2, '2026-05-29', '13:30', true),
(2, '2026-05-29', '14:30', true),
(2, '2026-05-29', '15:30', true),

/* Patente comercial */
(3, '2026-05-30', '10:00', true),
(3, '2026-05-30', '11:00', true),
(3, '2026-05-30', '12:00', true),

(3, '2026-05-31', '09:00', true),
(3, '2026-05-31', '10:00', true),
(3, '2026-05-31', '11:00', true),

/* Subsidios */
(4, '2026-06-01', '08:00', true),
(4, '2026-06-01', '09:00', true),
(4, '2026-06-01', '10:00', true),

(4, '2026-06-02', '11:00', true),
(4, '2026-06-02', '12:00', true),
(4, '2026-06-02', '13:00', true);


/* =========================================================
   INSERTS - ROLES
========================================================= */
INSERT INTO roles 
(nombre) 
VALUES
('usuario'),
('funcionario'),
('admin');


/* =========================================================
   INSERTS - OFICINAS
========================================================= */
INSERT INTO oficinas 
(nombre, direccion, horario, telefono) 
VALUES
('Oficina Central', 'Av. Principal 123', 'Lunes a Viernes 08:30 - 17:30', '600 329 932'),
('Dirección de Tránsito', 'Calle Tránsito 456', 'Lunes a Viernes 09:00 - 14:00', '600 329 933'),
('Centro Médico Municipal', 'Calle Salud 789', 'Lunes a Viernes 08:00 - 16:00', '600 329 934'),
('Departamento de Patentes', 'Av. Comercio 321', 'Lunes a Viernes 09:00 - 15:00', '600 329 935');

/* ======================================================================
   INSERT USUARIO PRUEBA: Registrar usuario de manera manual para testeo
========================================================================= */

