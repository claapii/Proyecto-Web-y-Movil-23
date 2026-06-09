import { IonPage, IonContent, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

const NotFound: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <h1 style={{ fontSize: '6rem', color: '#003366', margin: 0 }}>404</h1>
          <h2 style={{ color: '#003366' }}>Página no encontrada</h2>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            La página que buscas no existe o fue movida.
          </p>
          <IonButton onClick={() => history.push('/home')}>
            Volver al inicio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;