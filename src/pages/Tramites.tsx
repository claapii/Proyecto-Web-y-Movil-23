import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButton
} from '@ionic/react';

import './Tramites.css';
import NavBar from "../components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

/*
 * Página de trámites municipales.
 * Permite visualizar los principales
 * trámites disponibles dentro de la
 * plataforma municipal.
*/

const Tramites: React.FC = () => {

  const [tramites, setTramites] = useState<any[]>([]);

  useEffect(() => {

  const obtenerTramites = async () => {

    try {

      const response = await axios.get(
        "http://localhost:3000/api/tramites"
      );

      setTramites(response.data.data);

    } catch (error) {

      console.error(
        "Error al obtener trámites:",
        error
      );

    }

  };

  obtenerTramites();

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

        {/*Sección principal*/}
        <section className="tramites-hero">

          <div className="tramites-hero-text">

            <h1>
              Trámites Municipales
            </h1>

            <p>
              En esta sección podrás encontrar
              información sobre los principales
              trámites disponibles para la comunidad.
            </p>

          </div>

        </section>

        {/*Contenedor de trámites*/}
        <section className="tramites-container">

          <h2>
            Trámites disponibles
          </h2>

          {/*Grilla de trámites*/}
          <div className="tramites-grid">
            {
              tramites.map((tramite) => (

                <div
                  className="tramite-card"
                  key={tramite.id_tramite}
                >

                  <div className="tramite-icon">
                    📄
                  </div>

                  <h3>
                    {tramite.titulo}
                  </h3>

                  <p>
                    {tramite.descripcion}
                  </p>

                  <IonButton
                    routerLink={`/detalle/${tramite.id_tramite}`}
                    routerDirection="forward"
                    className="tramite-btn"
                  >
                    Ver trámite
                  </IonButton>

                </div>

              ))
            }
          </div>

        </section>

      </IonContent>

    </IonPage>
  );
};

export default Tramites;