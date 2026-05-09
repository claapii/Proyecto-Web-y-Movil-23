import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar
} from '@ionic/react';
import './Home.css';
import NavBar from "../components/NavBar";
import { NavLink } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <IonPage>

      {/* HEADER */}
      <IonHeader>
        <IonToolbar className="toolbar">
          <IonHeader>
            <IonToolbar className="toolbar">
              <NavBar />
            </IonToolbar>
          </IonHeader>
        </IonToolbar>
      </IonHeader>

      <IonContent>

        {/* 🔴 BANNER ENCUESTA */}
        <div className="banner">
          <div className="banner-text">
            <h1>ENCUESTA PARA MEJORAR EL RENDIMIENTO DE LA PÁGINA</h1>
            <button className="banner-btn">RESPONDE AQUÍ</button>
          </div>
          <img src="/encuesta.png" className="banner-img" />          
        </div>

        {/* 🔵 CARDS */}
        <div className="cards">

          <div className="card">
            <div className="icon-circle">📅</div>
            <h3>LICENCIAS DE CONDUCIR</h3>
            <button className="card-btn">AGENDA ACÁ</button>
          </div>

          <div className="card">
            <div className="icon-circle">🏢</div>
            <h3>NUESTRAS OFICINAS</h3>
            <button className="card-btn">VER AQUÍ</button>
          </div>

          <div className="card">
            <div className="icon-circle">📞</div>
            <h3>CONTÁCTANOS</h3>
            <p className="phone">600 329 932</p>
          </div>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;