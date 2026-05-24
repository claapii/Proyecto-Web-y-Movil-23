import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from "@ionic/react";

import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import NavBar from "../components/NavBar";

import {
  obtenerDetalleReserva
} from "../services/horariosService";

import "./DetalleReserva.css";

const DetalleReserva: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const [reserva, setReserva] = useState<any>(null);

  useEffect(() => {

    const cargarReserva = async () => {

      try {

        const data =
          await obtenerDetalleReserva(id);

        setReserva(data);

      } catch (error) {

        console.error(error);
      }
    };

    cargarReserva();

  }, [id]);

  if (!reserva) {

    return (

      <IonPage>

        <IonContent>

          <h1>
            Cargando reserva...
          </h1>

        </IonContent>

      </IonPage>
    );
  }

  return (

    <IonPage>

      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        <div className="detalle-reserva-container">

          <h1>
            Reserva Confirmada
          </h1>

          <div className="detalle-card">

            <h2>
              Datos del usuario
            </h2>

            <p>
              <strong>Nombre:</strong>{" "}
              {reserva.nombre} {reserva.apellido}
            </p>

            <p>
              <strong>Correo:</strong>{" "}
              {reserva.correo}
            </p>

            <p>
              <strong>RUT:</strong>{" "}
              {reserva.rut}
            </p>

            <h2>
              Datos del trámite
            </h2>

            <p>
              <strong>Trámite:</strong>{" "}
              {reserva.titulo}
            </p>

            <p>
              <strong>Fecha:</strong>{" "}
              {new Date(reserva.fecha)
                .toLocaleDateString("es-CL")}
            </p>

            <p>
              <strong>Hora:</strong>{" "}
              {reserva.hora.slice(0, 5)}
            </p>

            <p>
              <strong>Estado:</strong>{" "}
              {reserva.estado}
            </p>

          </div>

          <IonButton
            className="aceptar-btn"
            onClick={() => history.push("/home")}
          >
            Volver al inicio
          </IonButton>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default DetalleReserva;