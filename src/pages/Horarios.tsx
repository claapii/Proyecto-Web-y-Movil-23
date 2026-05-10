import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';

import './Horarios.css';

import { useState } from 'react';

import NavBar from "../components/NavBar";

/*
 * Página de selección de horarios.
 * Permite visualizar disponibilidad
 * y agendar una hora para un trámite.
*/

const Horarios: React.FC = () => {

  /*
   * Estado que almacena
   * el horario actualmente seleccionado.
  */
  const [horarioSeleccionado, setHorarioSeleccionado] =
    useState<string>('22 ABR - 9:30');

  /*
   * Datos temporales de horarios disponibles.
   * Simulan información obtenida desde backend.
  */
  const dias = [

    {
      dia: '21',

      mes: 'ABR',

      horarios: ['8:30', '-', '-', '-', '-', '11:00']
    },

    {
      dia: '22',

      mes: 'ABR',

      horarios: ['8:30', '9:00', '9:30', '10:00', '-', '-']
    },

    {
      dia: '23',

      mes: 'ABR',

      horarios: ['8:30', '-', '9:30', '-', '10:30', '-']
    },

    {
      dia: '24',

      mes: 'ABR',

      horarios: ['8:30', '9:00', '-', '10:00', '10:30', '-']
    },

    {
      dia: '25',

      mes: 'ABR',

      horarios: ['8:30', '-', '-', '-', '10:30', '-']
    }
  ];

  /*
   * Función para actualizar
   * el horario seleccionado.
  */
  const seleccionarHorario = (
    dia: string,
    mes: string,
    hora: string
  ) => {

    if (hora !== '-') {

      setHorarioSeleccionado(
        `${dia} ${mes} - ${hora}`
      );

    }
  };

  return (
    <IonPage>

      {/*Header superior reutilizable*/}
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

          {/*Mes actual*/}
          <h2 className="horarios-month">
            Abril
          </h2>

          <div className="calendar-container">

            {/*Encabezado de días*/}
            <div className="days-row">

              {dias.map((item, index) => (

                <div
                  className="day-column-title"
                  key={index}
                >

                  <h3>
                    {item.dia}
                  </h3>

                  <p>
                    {item.mes}
                  </p>

                </div>

              ))}

            </div>

            {/*Separador visual*/}
            <div className="divider"></div>

            {/*Grilla de horarios*/}
            <div className="schedule-grid">

              {dias.map((item, index) => (

                <div
                  className="schedule-column"
                  key={index}
                >

                  {item.horarios.map((hora, i) => {

                    /*Verifica si el horario está seleccionado*/
                    const seleccionado =
                      horarioSeleccionado ===
                      `${item.dia} ${item.mes} - ${hora}`;

                    return (

                      <button
                        key={i}

                        className={
                          hora === '-'
                            ? 'time-btn unavailable'
                            : seleccionado
                              ? 'time-btn selected'
                              : 'time-btn available'
                        }

                        disabled={hora === '-'}

                        onClick={() =>
                          seleccionarHorario(
                            item.dia,
                            item.mes,
                            hora
                          )
                        }
                      >

                        {hora}

                      </button>

                    );
                  })}

                </div>

              ))}

            </div>

            {/*Barra decorativa inferior*/}
            <div className="scroll-bar"></div>

            {/*Footer de agenda*/}
            <div className="schedule-footer">

              {/*Leyenda de estados*/}
              <div className="legend">

                <div>

                  <span className="legend-dot available-dot"></span>

                  Disponible

                </div>

                <div>

                  <span className="legend-dot selected-dot"></span>

                  Seleccionado

                </div>

                <div>

                  <span className="legend-dot unavailable-dot"></span>

                  No disponible

                </div>

              </div>

              {/*Mensaje de confirmación*/}
              <div className="email-message">

                Enviaremos un comprobante de la cita
                a tu correo electrónico

              </div>

              {/*Resumen de selección*/}
              <div className="confirm-box">

                <button className="confirm-btn">
                  Aceptar
                </button>

                <p>
                  Horario seleccionado:
                </p>

                <strong>
                  {horarioSeleccionado}
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