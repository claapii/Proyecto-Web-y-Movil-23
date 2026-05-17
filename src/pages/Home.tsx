import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './Home.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import NavBar from "../components/NavBar";

/*
 * Página principal del sistema.
 * Contiene accesos rápidos a:
 * - trámites municipales
 * - oficinas
 * - contacto
 * 
 * Además incluye un banner informativo
 * para encuestas y mejoras de la plataforma.
*/

const Home: React.FC = () => {
  const history = useHistory();
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      history.push("/");
    }

  }, []);
  return (
    <IonPage>

      {/*Header superior reutilizable*/}
      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        {/*Banner principal*/}
        <div className="banner">

          {/*Texto y acción principal*/}
          <div className="banner-text">

            <h1>
              ENCUESTA PARA MEJORAR EL
              RENDIMIENTO DE LA PÁGINA
            </h1>

            {/*Botón de acceso a encuesta*/}
            <IonButton className="banner-btn">
              RESPONDE AQUÍ
            </IonButton>

          </div>

          {/*Imagen decorativa del banner*/}
          <img
            src="/encuesta.png"
            className="banner-img"
          />

        </div>

        {/*Tarjetas de acceso rápido*/}
        <div className="cards">

          {/*CARD 1 - Licencias*/}
          <div className="card">

            {/*Icono decorativo*/}
            <div className="icon-circle">
              📅
            </div>

            <h3>
              LICENCIAS DE CONDUCIR
            </h3>

            {/*Navegación al detalle del trámite*/}
            <IonButton
              className="card-btn"
              routerLink="/detalle/1"
              routerDirection="forward"
            >
              AGENDA ACÁ
            </IonButton>

          </div>

          {/*CARD 2 - Oficinas*/}
          <div className="card">

            {/*Icono decorativo*/}
            <div className="icon-circle">
              🏢
            </div>

            <h3>
              NUESTRAS OFICINAS
            </h3>

            {/*Navegación a oficinas*/}
            <IonButton
              className="card-btn"
              routerLink="/oficinas"
              routerDirection="forward"
            >
              VER AQUÍ
            </IonButton>

          </div>

          {/*CARD 3 - Contacto*/}
          <div className="card">

            {/*Icono decorativo*/}
            <div className="icon-circle">
              📞
            </div>

            <h3>
              CONTÁCTANOS
            </h3>

            {/*Número de contacto municipal*/}
            <p className="phone">
              600 329 932
            </p>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Home;