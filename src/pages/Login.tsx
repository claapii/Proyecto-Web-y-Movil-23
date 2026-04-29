import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <h2>Iniciar sesión</h2>

        <IonButton expand="block" routerLink="/home">
          Ingresar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;