import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton
} from '@ionic/react';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <h2>Bienvenido a MuniDigital</h2>

        <p>
          Gestiona tus trámites municipales de forma rápida y sencilla.
        </p>

        <IonButton expand="block" routerLink="/tramites">
          Ver trámites disponibles
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Home;