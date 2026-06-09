import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router';

const AdminPanel: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{ padding: '2rem' }}>
          <h1>Panel de Administración</h1>
          <p>Solo los usuarios con rol <strong>admin</strong> pueden ver esta página.</p>
          <IonButton onClick={() => history.push('/home')}>
            Volver al inicio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminPanel;