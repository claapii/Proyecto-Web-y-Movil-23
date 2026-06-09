import {
  IonPage,
  IonContent,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/react';

import './Register.css';
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUsuario } from "../../data/authService";
import { useToast } from '../../../../core/presentation/hooks/useToast';


/*
 * Página de registro de usuarios.
 * Permite crear una nueva cuenta
 * dentro de la plataforma municipal.
*/

const Register: React.FC = () => {
  const history = useHistory();
  const { showToast } = useToast();


  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [rut, setRut] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      showToast("Las contraseñas no coinciden", "danger");
      return;
    }

    try {

      await registerUsuario({
        nombre,
        apellido,
        correo,
        rut,
        password
      });

      showToast("Usuario registrado correctamente", "success");

      history.push("/");

    } catch (error: any) {
      const mensaje = error.response?.data?.message || "Error al registrar usuario";
      showToast(mensaje, "danger");
      console.error(error);
    }
  };

  return (
    <IonPage>

      <IonContent fullscreen>

        {/*Contenedor principal centrado*/}
        <div className="register-wrapper">

          {/*Caja principal de registro*/}
          <div className="register-box">

            {/*Logo institucional*/}
            <img
              src="/logoMuniDigital.png"
              className="register-logo"
            />

            {/*Título principal*/}
            <h2>
              Crear cuenta
            </h2>

            {/*Campo nombre*/}
            <IonItem>
              <IonInput
                placeholder="Nombre"
                onIonInput={(e) => setNombre(e.detail.value!)}
              />
            </IonItem>

            {/*Campo apellido*/}
            <IonItem>
              <IonInput
                placeholder="Apellido"
                onIonInput={(e) => setApellido(e.detail.value!)}
              />
            </IonItem>

            {/*Campo correo electrónico*/}
            <IonItem>
              <IonInput
                placeholder="Correo electrónico"
                onIonInput={(e) => setCorreo(e.detail.value!)}
              />
            </IonItem>

            {/*Campo RUT*/}
            <IonItem>
              <IonInput
                placeholder="RUT"
                onIonInput={(e) => setRut(e.detail.value!)}
              />
            </IonItem>

            {/*Campo contraseña*/}
            <IonItem>
              <IonInput
                type="password"
                placeholder="Contraseña"
                onIonInput={(e) => setPassword(e.detail.value!)}
              />
            </IonItem>

            {/*Confirmación de contraseña*/}
            <IonItem>
              <IonInput
                type="password"
                placeholder="Confirmar contraseña"
                onIonInput={(e) => setConfirmPassword(e.detail.value!)}
              />
            </IonItem>

            {/*Botón de registro*/}
            <IonButton
              expand="block"
              className="primary-btn"
              onClick={handleRegister}
            >
              Registrarse
            </IonButton>

          </div>

        </div>

      </IonContent>

    </IonPage>
  );
};

export default Register;