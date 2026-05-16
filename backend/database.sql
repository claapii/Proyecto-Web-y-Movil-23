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

    password VARCHAR(255) NOT NULL
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

    fecha VARCHAR(50) NOT NULL,
    hora VARCHAR(20) NOT NULL,

    estado VARCHAR(30) DEFAULT 'pendiente',

    FOREIGN KEY (id_usuario)
    REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_tramite)
    REFERENCES tramites(id_tramite)
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
   INSERT USUARIO PRUEBA
========================================================= */

INSERT INTO usuarios
(nombre, apellido, correo, rut, password)
VALUES
(
  'Admin',
  'Municipal',
  'admin@munidigital.cl',
  '11.111.111-1',
  '1234'
);