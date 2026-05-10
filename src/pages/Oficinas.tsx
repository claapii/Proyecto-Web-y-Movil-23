import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './Oficinas.css';

import NavBar from "../components/NavBar";

/*
 * Página de oficinas municipales.
 * Permite visualizar información
 * relacionada con:
 * - ubicación
 * - horarios
 * - contacto
 * - servicios disponibles
 * 
 * de distintas oficinas municipales.
*/

const Oficinas: React.FC = () => {
  return (
    <IonPage>

      {/*Header superior reutilizable*/}
      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        {/*Sección principal informativa*/}
        <section className="oficinas-hero">

          <div className="oficinas-hero-text">

            <h1>
              Nuestras Oficinas
            </h1>

            <p>
              Encuentra aquí la información de atención,
              ubicación y horarios de las principales
              oficinas municipales.
            </p>

          </div>

        </section>

        {/*Contenedor principal de oficinas*/}
        <section className="oficinas-container">

          <h2>
            Oficinas disponibles
          </h2>

          {/*Grilla de oficinas*/}
          <div className="oficinas-grid">

            {/*Oficina 1*/}
            <div className="oficina-card">

              {/*Icono representativo*/}
              <div className="oficina-icon">
                🏛️
              </div>

              <h3>
                Oficina Municipal Central
              </h3>

              <p>
                Atención general para trámites,
                consultas y orientación ciudadana.
              </p>

              {/*Información adicional*/}
              <div className="oficina-info">

                <p>
                  <strong>Dirección:</strong>
                  {" "}Av. Central 123
                </p>

                <p>
                  <strong>Horario:</strong>
                  {" "}Lunes a viernes, 08:00 a 14:00 hrs
                </p>

                <p>
                  <strong>Teléfono:</strong>
                  {" "}600 329 932
                </p>

              </div>

              {/*Acción principal*/}
              <IonButton className="oficina-btn">

                Ver ubicación

              </IonButton>

            </div>

            {/*Oficina 2*/}
            <div className="oficina-card">

              <div className="oficina-icon">
                🚗
              </div>

              <h3>
                Dirección de Tránsito
              </h3>

              <p>
                Encargada de otorgar licencias de conducir
                y permisos de circulación, optimizar los
                recursos, señalizar y mejorar el uso de
                las vías públicas.
              </p>

              <div className="oficina-info">

                <p>
                  <strong>Dirección:</strong>
                  {" "}Calle Tránsito 456
                </p>

                <p>
                  <strong>Horario:</strong>
                  {" "}Lunes a viernes, 08:00 a 14:00 hrs
                </p>

                <p>
                  <strong>Teléfono:</strong>
                  {" "}600 329 932
                </p>

              </div>

              <IonButton className="oficina-btn">

                Ver ubicación

              </IonButton>

            </div>

            {/*Oficina 3*/}
            <div className="oficina-card">

              <div className="oficina-icon">
                🏥
              </div>

              <h3>
                Dirección de Salud
              </h3>

              <p>
                Tiene como misión controlar y supervisar
                la gestión de salud comunal, tanto en lo
                administrativo como en lo sanitario.
              </p>

              <div className="oficina-info">

                <p>
                  <strong>Dirección:</strong>
                  {" "}Av. Salud 789
                </p>

                <p>
                  <strong>Horario:</strong>
                  {" "}Lunes a viernes, 08:00 a 14:00 hrs
                </p>

                <p>
                  <strong>Teléfono:</strong>
                  {" "}600 329 932
                </p>

              </div>

              <IonButton className="oficina-btn">

                Ver ubicación

              </IonButton>

            </div>

            {/*Oficina 4*/}
            <div className="oficina-card">

              <div className="oficina-icon">
                🤝
              </div>

              <h3>
                Atención Social
              </h3>

              <p>
                Orientación y apoyo en beneficios sociales,
                programas municipales y ayuda comunitaria.
              </p>

              <div className="oficina-info">

                <p>
                  <strong>Dirección:</strong>
                  {" "}Pasaje Social 321
                </p>

                <p>
                  <strong>Horario:</strong>
                  {" "}Lunes a jueves, 08:00 a 14:00 hrs
                </p>

                <p>
                  <strong>Teléfono:</strong>
                  {" "}600 329 932
                </p>

              </div>

              <IonButton className="oficina-btn">

                Ver ubicación

              </IonButton>

            </div>

          </div>

        </section>

      </IonContent>

    </IonPage>
  );
};

export default Oficinas;