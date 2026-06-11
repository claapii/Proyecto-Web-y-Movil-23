import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButton,
  IonSpinner
} from "@ionic/react";

import { useParams } from "react-router-dom";
import "./Detalle.css";
import NavBar from "../../../../core/presentation/components/NavBar";
import axios from "axios";
import { useEffect, useState } from "react";

/*
 * Página de detalle de trámites.
 * Muestra información específica según el
 * identificador recibido desde la URL.
*/

const Detalle: React.FC = () => {

  /*Obtención del parámetro dinámico de la ruta*/
  const { id } = useParams<{ id: string }>();
  const [tramite, setTramite] = useState<any>(null);

  /*
   * Base de datos temporal de trámites.
   * Simula información obtenida desde backend.
  */
  useEffect(() => {

    const obtenerTramite = async () => {

      try {

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tramites/${id}`
        );

        console.log("Respuesta tramites:", response.data);


        setTramite(response.data.data);

      } catch (error) {

        console.error(
          "Error al obtener trámite:",
          error
        );

      }

    };

    obtenerTramite();

  }, [id]);

  /*
   * Validación:
   * Si el trámite no existe,
   * se muestra mensaje de error.
  */
  if (!tramite) {
    return (
      <IonPage>

        <IonContent>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <IonSpinner name="crescent" />
          </div>

        </IonContent>

      </IonPage>
    );
  }

  return (
    <IonPage>

      {/*Header superior reutilizable*/}
      <IonHeader>

        <IonToolbar className="toolbar">

          <NavBar />

        </IonToolbar>

      </IonHeader>

      <IonContent>

        <div className="detalle-container">

          {/*Información principal del trámite*/}
          <div className="detalle-info">

            <h1>
              {tramite.titulo}
            </h1>

            <h3>
              DESCRIPCIÓN
            </h3>

            <p>
              {tramite.descripcion}
            </p>

            <h3>
              INFORMACIÓN ADICIONAL
            </h3>

            <div className="detalle-adicional">
              <p>⏱ Duración: {tramite.duracion}</p>
              <p>📍 Modalidad: {tramite.modalidad}</p>
              <p>🏢 Ubicación: {tramite.ubicacion}</p>
            </div>

          </div>

          {/*Lista de requisitos*/}
          <div className="requisitos">

            {tramite.requisitos.map((req: any, index: number) => (

              <div
                className="req-item"
                key={index}
              >

                {/*Icono visual del requisito*/}
                <div className="circle">
                  {req.icono}
                </div>

                {/*Descripción del requisito*/}
                <p>
                  {req.texto}
                </p>

              </div>

            ))}

          </div>

          {/*Navegación hacia horarios disponibles*/}
          <IonButton
            routerLink={`/horarios/${id}`}
            className="detalle-btn"
          >
            Ver horarios
          </IonButton>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Detalle;