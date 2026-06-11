import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';

import './Horarios.css';

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useToast } from '../../../../core/presentation/hooks/useToast';
import { useStorage } from '../../../../core/presentation/hooks/useStorage';
import emailjs from '@emailjs/browser';
import axios from 'axios';



import NavBar from "../../../../core/presentation/components/NavBar";

import {
  obtenerHorarios,
  reservarHorario
} from "../../data/horariosService";

/*
 * Página de selección de horarios.
 * Obtiene horarios dinámicamente
 * desde PostgreSQL mediante backend.
*/

const Horarios: React.FC = () => {

  const history = useHistory();
  const { showToast } = useToast();
  const { guardar, obtener } = useStorage();
  const [tramite, setTramite] = useState<any>(null);


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

        // Obtener nombre del trámite
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/tramites/${id}`);
      setTramite(response.data.data);

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

                      showToast("Selecciona un horario", "warning");
                      return;
                    }

                    try {

                      const token =
                        localStorage.getItem("token");

                      if (!token) {

                        showToast("Debes iniciar sesión para reservar", "danger");
                        return;
                      }

                      const response =
                        await reservarHorario(
                          Number(id),
                          idHorarioSeleccionado
                        );

                      console.log(response);
                      // Guardar reserva localmente
                      const reservasGuardadas = await obtener('reservas') || [];
                      reservasGuardadas.push(response.data);
                      await guardar('reservas', reservasGuardadas);

                      //Obtener datos del usuario
                      const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

                      //enviar correo de confirmación
                      await emailjs.send(
                        import.meta.env.VITE_EMAILJS_SERVICE_ID,
                        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                        {
                          nombre: `${usuario.nombre} ${usuario.apellido}`,
                          email: usuario.correo,
                          tramite: tramite?.titulo || `Trámite #${id}`,
                          fecha: horarioSeleccionado.split(" - ")[0],
                          hora: horarioSeleccionado.split(" - ")[1],
                        },
                        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                      );

                      const idReserva =
                        response.data.id_reserva;

                      /* Recarga horarios */
                      const data =
                        await obtenerHorarios(id);

                      setHorarios(data);

                      /* Limpia selección */
                      setHorarioSeleccionado("");

                      setIdHorarioSeleccionado(
                        null
                      );

                      /* Ir al detalle */
                      history.push(
                        `/reserva/${idReserva}`
                      );

                    } catch (error: any) {

                      console.error(error);

                      const mensaje =
                        error.response?.data?.message ||
                        "Error al reservar horario";

                      showToast(mensaje, "danger");
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