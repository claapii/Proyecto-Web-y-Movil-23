import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';

import './Horarios.css';
import { useState } from 'react';
import NavBar from "../components/NavBar";

const Horarios: React.FC = () => {

  const [horarioSeleccionado, setHorarioSeleccionado] = useState<string>('22 ABR - 9:30');

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

  const seleccionarHorario = (dia: string, mes: string, hora: string) => {
    if (hora !== '-') {
      setHorarioSeleccionado(`${dia} ${mes} - ${hora}`);
    }
  };

  return (
    <IonPage>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="toolbar">
          <NavBar />
        </IonToolbar>
      </IonHeader>

      <IonContent>

        <section className="horarios-page">

          <h1 className="horarios-title">Agenda de horarios</h1>
          <h2 className="horarios-month">Abril</h2>

          <div className="calendar-container">

            {/* DÍAS */}
            <div className="days-row">
              {dias.map((item, index) => (
                <div className="day-column-title" key={index}>
                  <h3>{item.dia}</h3>
                  <p>{item.mes}</p>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            {/* HORARIOS */}
            <div className="schedule-grid">
              {dias.map((item, index) => (
                <div className="schedule-column" key={index}>
                  {item.horarios.map((hora, i) => {
                    const seleccionado = horarioSeleccionado === `${item.dia} ${item.mes} - ${hora}`;

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
                        onClick={() => seleccionarHorario(item.dia, item.mes, hora)}
                      >
                        {hora}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="scroll-bar"></div>

            {/* FOOTER DE AGENDA */}
            <div className="schedule-footer">

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

              <div className="email-message">
                Enviaremos un comprobante de la cita a tu correo electrónico
              </div>

              <div className="confirm-box">
                <button className="confirm-btn">Aceptar</button>
                <p>Horario seleccionado:</p>
                <strong>{horarioSeleccionado}</strong>
              </div>

            </div>

          </div>

        </section>

      </IonContent>
    </IonPage>
  );
};

export default Horarios;