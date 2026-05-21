import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';

import './Horarios.css';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import NavBar from "../components/NavBar";

import {
  obtenerHorarios,
  reservarHorario
} from "../services/horariosService";

/*
 * Página de selección de horarios.
 * Obtiene horarios dinámicamente
 * desde PostgreSQL mediante backend.
*/

const Horarios: React.FC = () => {

  /* ID trámite desde URL */
  const { id } = useParams<{ id: string }>();

  /* Lista de horarios */
  const [horarios, setHorarios] = useState<any[]>([]);

  /* Horario seleccionado */
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState("");

  /* ID horario seleccionado */
  const [
    idHorarioSeleccionado,
    setIdHorarioSeleccionado
  ] = useState<number | null>(null);

  /*
   * Carga horarios desde backend
  */
  useEffect(() => {

    const cargarHorarios = async () => {

      try {

        const data = await obtenerHorarios(id);

        setHorarios(data);

      } catch (error) {

        console.error(error);
      }
    };

    cargarHorarios();

  }, [id]);

  /*
   * Selección de horario
  */
  const seleccionarHorario = (
    id_horario: number,
    fecha: string,
    hora: string
  ) => {

    setIdHorarioSeleccionado(
      id_horario
    );

    setHorarioSeleccionado(
      `${fecha} - ${hora}`
    );
  };

  /*
   * Agrupa horarios por fecha
  */
  const horariosAgrupados = horarios.reduce(
    (acc: any, horario: any) => {

      const fechaObj = new Date(horario.fecha);

      const dia = fechaObj.toLocaleDateString(
        "es-CL",
        {
          day: "numeric"
        }
      );

      const mes = fechaObj
        .toLocaleDateString(
          "es-CL",
          {
            month: "short"
          }
        )
        .replace(".", "")
        .toUpperCase();

      const claveFecha = `${dia}-${mes}`;

      if (!acc[claveFecha]) {
        acc[claveFecha] = [];
      }

      acc[claveFecha].push(horario);

      return acc;

    }, {}
  );

  return (
    <IonPage>

      {/*Header superior*/}
      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        <section className="horarios-page">

          {/*Título principal*/}
          <h1 className="horarios-title">
            Agenda de horarios
          </h1>

          {/*Subtítulo*/}
          <h2 className="horarios-month">
            Horarios disponibles
          </h2>

          {/*Contenedor principal*/}
          <div className="calendar-container">

            {/*Grilla*/}
            <div className="schedule-grid">

              {Object.entries(horariosAgrupados).map(
                ([fecha, horariosDelDia]: any) => {

                  const [dia, mes] =
                    fecha.split("-");

                  return (

                    <div
                      className="schedule-column"
                      key={fecha}
                    >

                      {/*Fecha*/}
                      <div className="day-column-title">

                        <h3>{dia}</h3>

                        <p>{mes}</p>

                      </div>

                      {/*Horarios*/}
                      {horariosDelDia.map(
                        (horario: any) => {

                          const horaFormateada =
                            horario.hora.slice(0, 5);

                          const seleccionado =
                            horarioSeleccionado ===
                            `${fecha} - ${horaFormateada}`;

                          return (

                            <button
                              key={horario.id_horario}

                              className={
                                !horario.disponible
                                  ? 'time-btn unavailable'
                                  : seleccionado
                                    ? 'time-btn selected'
                                    : 'time-btn available'
                              }

                              disabled={
                                !horario.disponible
                              }

                              onClick={() =>
                                seleccionarHorario(
                                  horario.id_horario,
                                  fecha,
                                  horaFormateada
                                )
                              }
                            >

                              {horaFormateada}

                            </button>
                          );
                        }
                      )}

                    </div>
                  );
                }
              )}

            </div>

            {/*Barra decorativa*/}
            <div className="scroll-bar"></div>

            {/*Footer*/}
            <div className="schedule-footer">

              {/*Leyenda*/}
              <div className="legend">

                <div>

                  <span className="legend-dot available-dot"></span>

                  Disponible

                </div>

                <div>

                  <span className="legend-dot selected-dot"></span>

                  Seleccionado

                </div>

              </div>

              {/*Mensaje*/}
              <div className="email-message">

                Enviaremos un comprobante de la cita
                a tu correo electrónico

              </div>

              {/*Confirmación*/}
              <div className="confirm-box">

                <button
                  className="confirm-btn"

                  onClick={async () => {

                    if (!idHorarioSeleccionado) {

                      alert(
                        "Selecciona un horario"
                      );

                      return;
                    }

                    try {

                      await reservarHorario(
                        idHorarioSeleccionado
                      );

                      alert(
                        "Horario reservado correctamente"
                      );

                      /* Recarga horarios */
                      const data =
                        await obtenerHorarios(id);

                      setHorarios(data);

                      /* Limpia selección */
                      setHorarioSeleccionado("");

                      setIdHorarioSeleccionado(
                        null
                      );

                    } catch (error) {

                      console.error(error);

                      alert(
                        "Error al reservar horario"
                      );
                    }
                  }}
                >
                  Aceptar
                </button>

                <p>
                  Horario seleccionado:
                </p>

                <strong>
                  {horarioSeleccionado || "Ninguno"}
                </strong>

              </div>

            </div>

          </div>

        </section>

      </IonContent>

    </IonPage>
  );
};

export default Horarios;