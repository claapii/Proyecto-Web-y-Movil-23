import axios from "axios";

const API_HORARIOS = `${import.meta.env.VITE_API_URL}/horarios`;
const API_RESERVAS = `${import.meta.env.VITE_API_URL}/reservas`;

export const obtenerHorarios = async (
  id_tramite: string
) => {

  const response = await axios.get(
    `${API_HORARIOS}/${id_tramite}`
  );

  console.log(response.data);

  return response.data.data;
};

export const reservarHorario = async (
  id_tramite: number,
  id_horario: number
) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_RESERVAS,
    {
      id_tramite,
      id_horario
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const obtenerDetalleReserva = async (
  id_reserva: string
) => {

  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_RESERVAS}/detalle/${id_reserva}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data.data;
};