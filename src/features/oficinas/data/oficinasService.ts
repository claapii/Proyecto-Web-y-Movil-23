import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/oficinas`;

const getToken = () => localStorage.getItem("token");

export const getOficinas = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getOficinaPorId = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const crearOficina = async (datos: any) => {
  const response = await axios.post(API_URL, datos, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const actualizarOficina = async (id: number, datos: any) => {
  const response = await axios.put(`${API_URL}/${id}`, datos, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};

export const eliminarOficina = async (id: number) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
  return response.data;
};