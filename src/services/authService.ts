import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

export const loginUsuario = async (
  correo: string,
  password: string
) => {

  const response = await axios.post(
    `${API_URL}/login`,
    {
      correo,
      password
    }
  );

  return response.data;
};

export const registerUsuario = async (datos: any) => {

  const response = await axios.post(
    `${API_URL}/register`,
    datos
  );

  return response.data;
};

export const loginClaveUnica = async (
  rut: string,
  password: string
) => {

  const response = await axios.post(
    `${API_URL}/claveunica`,
    {
      rut,
      password
    }
  );

  return response.data;
};