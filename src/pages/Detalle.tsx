import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton
} from "@ionic/react";

import { useParams } from "react-router-dom";

import "./detalle.css";

import NavBar from "../components/NavBar";

/*
 * Página de detalle de trámites.
 * Muestra información específica según el
 * identificador recibido desde la URL.
*/

const Detalle: React.FC = () => {

  /*Obtención del parámetro dinámico de la ruta*/
  const { id } = useParams<{ id: string }>();

  /*
   * Base de datos temporal de trámites.
   * Simula información obtenida desde backend.
  */
  const tramites: Record<string, any> = {

    "1": {
      titulo: "LICENCIA DE CONDUCIR",

      descripcion:
        "Este trámite permite solicitar o renovar la licencia de conducir en la municipalidad.",

      duracion: "30 minutos",

      modalidad: "Presencial",

      ubicacion: "Oficina Municipal",

      requisitos: [
        {
          icono: "18+",
          texto: "Mayor de 18 años"
        },

        {
          icono: "🪪",
          texto: "Cédula vigente"
        },

        {
          icono: "🩺",
          texto: "Examen médico aprobado"
        }
      ]
    },

    "2": {
      titulo: "PERMISO DE CIRCULACIÓN",

      descripcion:
        "Este trámite permite renovar u obtener el permiso de circulación.",

      duracion: "20 minutos",

      modalidad: "Presencial y online",

      ubicacion: "Dirección de tránsito",

      requisitos: [
        {
          icono: "🚗",
          texto: "Vehículo registrado"
        },

        {
          icono: "📄",
          texto: "Documentación al día"
        },

        {
          icono: "💳",
          texto: "Pago del permiso"
        }
      ]
    },

    "3": {
      titulo: "CERTIFICADOS MÉDICOS",

      descripcion:
        "Solicita certificados médicos y documentos necesarios.",

      duracion: "15 minutos",

      modalidad: "Presencial",

      ubicacion: "Centro médico municipal",

      requisitos: [
        {
          icono: "🩺",
          texto: "Evaluación médica"
        },

        {
          icono: "🪪",
          texto: "Cédula vigente"
        },

        {
          icono: "📋",
          texto: "Solicitud del trámite"
        }
      ]
    },

    "4": {
      titulo: "INSCRIPCIÓN PATENTE",

      descripcion:
        "Realiza la inscripción de patente comercial.",

      duracion: "25 minutos",

      modalidad: "Presencial",

      ubicacion: "Departamento de patentes",

      requisitos: [
        {
          icono: "🏢",
          texto: "Dirección comercial"
        },

        {
          icono: "📄",
          texto: "Documentación legal"
        },

        {
          icono: "💼",
          texto: "Inicio de actividades"
        }
      ]
    }
  };

  /*Obtención del trámite correspondiente*/
  const tramite = id ? tramites[id] : null;

  /*
   * Validación:
   * Si el trámite no existe,
   * se muestra mensaje de error.
  */
  if (!tramite) {
    return (
      <IonPage>

        <IonContent>

          <h1>
            Trámite no encontrado
          </h1>

        </IonContent>

      </IonPage>
    );
  }

  return (
    <IonPage>

      {/*Header superior reutilizable*/}
      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        <div className="detalle-container">

          {/*Información principal del trámite*/}
          <div className="detalle-info">

            <h1>
              {tramite.titulo}
            </h1>

            <h3>
              DESCRIPCIÓN
            </h3>

            <p>
              {tramite.descripcion}
            </p>

            <h3>
              INFORMACIÓN ADICIONAL
            </h3>

            <p>
              Duración estimada: {tramite.duracion}
            </p>

            <p>
              Modalidad: {tramite.modalidad}
            </p>

            <p>
              Ubicación: {tramite.ubicacion}
            </p>

          </div>

          {/*Lista de requisitos*/}
          <div className="requisitos">

            {tramite.requisitos.map((req: any, index: number) => (

              <div
                className="req-item"
                key={index}
              >

                {/*Icono visual del requisito*/}
                <div className="circle">
                  {req.icono}
                </div>

                {/*Descripción del requisito*/}
                <p>
                  {req.texto}
                </p>

              </div>

            ))}

          </div>

          {/*Navegación hacia horarios disponibles*/}
          <IonButton
            routerLink={`/horarios/${id}`}
            className="detalle-btn"
          >
            Ver horarios
          </IonButton>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Detalle;