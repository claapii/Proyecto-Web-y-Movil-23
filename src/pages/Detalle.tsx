import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton
} from "@ionic/react";

import { useParams } from "react-router-dom";

import "./detalle.css";
import { NavLink } from "react-router-dom";



const Detalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const tramites: Record<string, any> = {

    "1": {
      titulo: "LICENCIA DE CONDUCIR",
      descripcion:
        "Este trámite permite solicitar o renovar la licencia de conducir en la municipalidad.",
      duracion: "30 minutos",
      modalidad: "Presencial",
      ubicacion: "Oficina Municipal",

      requisitos: [
        { icono: "18+", texto: "Mayor de 18 años" },
        { icono: "🪪", texto: "Cédula vigente" },
        { icono: "🩺", texto: "Examen médico aprobado" }
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
        { icono: "🚗", texto: "Vehículo registrado" },
        { icono: "📄", texto: "Documentación al día" },
        { icono: "💳", texto: "Pago del permiso" }
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
        { icono: "🩺", texto: "Evaluación médica" },
        { icono: "🪪", texto: "Cédula vigente" },
        { icono: "📋", texto: "Solicitud del trámite" }
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
        { icono: "🏢", texto: "Dirección comercial" },
        { icono: "📄", texto: "Documentación legal" },
        { icono: "💼", texto: "Inicio de actividades" }
      ]
    }

  };

  const tramite = id ? tramites[id] : null;
  if (!tramite) {
  return (
    <IonPage>
      <IonContent>
        <h1>Trámite no encontrado</h1>
      </IonContent>
    </IonPage>
  );
}
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <div className="header-container">
            <img src="/logoMuniDigitalBlanco.png" alt="logo" className="home-logo" />

            <nav className="nav-menu">
                <NavLink to="/home">Inicio</NavLink>
                <NavLink to="/tramites">Trámites</NavLink>
                <NavLink to="/oficinas">Oficinas</NavLink>
                <NavLink to="/faq">Preguntas frecuentes</NavLink>
            </nav>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="detalle-container">

          {/* IZQUIERDA */}
          <div className="detalle-info">
            <h1>{tramite.titulo}</h1>

            <h3>DESCRIPCIÓN</h3>
            <p>
              {tramite.descripcion}
            </p>

            <h3>INFORMACIÓN ADICIONAL</h3>
            <p>Duración estimada: {tramite.duracion}</p>
            <p>Modalidad: {tramite.modalidad}</p>
            <p>Ubicación: {tramite.ubicacion}</p>
          </div>

          <div className="requisitos">

          {tramite.requisitos.map((req: any, index: number) => (
            <div className="req-item" key={index}>

              <div className="circle">
                {req.icono}
              </div>

              <p>{req.texto}</p>

            </div>
          ))}

        </div>

          {/* DERECHA */}
          {/*<div className="detalle-card">
            <h3>REQUISITOS</h3>

            <div className="requisitos">
              <div className="req-item">
                <div className="circle">18+</div>
                <p>Mayor de 18 años</p>
              </div>

              <div className="req-item">
                <div className="circle"><img src="/cedula.png" alt="Cédula" className="req-img" /></div>
                <p>Cédula vigente</p>
              </div>

              <div className="req-item">
                <div className="circle">🩺</div>
                <p>Examen médico aprobado</p>
              </div>
            </div>

                <IonButton routerLink= "/horarios">
                Ver horarios
                </IonButton>
          </div>*/}

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Detalle;