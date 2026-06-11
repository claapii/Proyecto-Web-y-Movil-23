import {
  IonPage, IonContent, IonHeader,
  IonToolbar, IonButton, IonSpinner
} from '@ionic/react';
import { useState, useEffect } from 'react';
import './Oficinas.css';
import NavBar from "../../../../core/presentation/components/NavBar";
import { getOficinas } from "../../data/oficinasService";

const iconos = ['🏛️', '🚗', '🏥', '🤝', '🏢', '📋'];

const Oficinas: React.FC = () => {
  const [oficinas, setOficinas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarOficinas();
  }, []);

  const cargarOficinas = async () => {
    try {
      const response = await getOficinas();
      setOficinas(response.data || []);
    } catch (error) {
      console.error("Error al cargar oficinas:", error);
      setOficinas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <NavBar />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <section className="oficinas-hero">
          <div className="oficinas-hero-text">
            <h1>Nuestras Oficinas</h1>
            <p>
              Encuentra aquí la información de atención,
              ubicación y horarios de las principales
              oficinas municipales.
            </p>
          </div>
        </section>

        <section className="oficinas-container">
          <h2>Oficinas disponibles</h2>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <IonSpinner />
            </div>
          ) : (
            <div className="oficinas-grid">
              {oficinas.map((oficina, index) => (
                <div className="oficina-card" key={oficina.id_oficina}>
                  <div className="oficina-icon">
                    {iconos[index % iconos.length]}
                  </div>
                  <h3>{oficina.nombre}</h3>
                  <div className="oficina-info">
                    <p><strong>Dirección:</strong> {oficina.direccion}</p>
                    <p><strong>Horario:</strong> {oficina.horario}</p>
                    <p><strong>Teléfono:</strong> {oficina.telefono}</p>
                  </div>
                  <IonButton className="oficina-btn">
                    Ver ubicación
                  </IonButton>
                </div>
              ))}
            </div>
          )}
        </section>
      </IonContent>
    </IonPage>
  );
};

export default Oficinas;