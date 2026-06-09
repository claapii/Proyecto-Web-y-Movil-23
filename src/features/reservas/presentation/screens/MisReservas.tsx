import {
  IonPage, IonContent, IonHeader,
  IonToolbar, IonButton, IonSpinner
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../../../../core/presentation/components/NavBar';
import { useStorage } from '../../../../core/presentation/hooks/useStorage';
import './MisReservas.css';

const MisReservas: React.FC = () => {
  const { obtener, eliminar } = useStorage();
  const [reservas, setReservas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const data = await obtener('reservas');
      setReservas(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const limpiarReservas = async () => {
    await eliminar('reservas');
    setReservas([]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <NavBar />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div style={{ padding: '1.5rem' }}>
          <h1>Mis Reservas</h1>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <IonSpinner />
            </div>
          ) : reservas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No tienes reservas guardadas.</p>
              <IonButton onClick={() => history.push('/home')}>
                Ir al inicio
              </IonButton>
            </div>
          ) : (
            <>
              {reservas.map((reserva, index) => (
                <div key={index} style={{
                  padding: '1rem', marginBottom: '1rem',
                  border: '1px solid #ddd', borderRadius: '8px'
                }}>
                  <p><strong>Trámite ID:</strong> {reserva.id_tramite}</p>
                  <p><strong>Horario ID:</strong> {reserva.id_horario}</p>
                  <p><strong>Estado:</strong> {reserva.estado}</p>
                  <p><strong>Fecha de reserva:</strong> {new Date(reserva.creado_en).toLocaleDateString('es-CL')}</p>
                  <IonButton
                    fill="outline"
                    onClick={() => history.push(`/reserva/${reserva.id_reserva}`)}
                  >
                    Ver detalle
                  </IonButton>
                </div>
              ))}
              <IonButton color="danger" onClick={limpiarReservas}>
                Limpiar reservas locales
              </IonButton>
            </>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MisReservas;