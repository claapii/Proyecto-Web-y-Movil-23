import axios from "axios";

const API_URL = "http://localhost:3000/api/horarios";

export const obtenerHorarios = async (
  id_tramite: string
) => {

  const response = await axios.get(
    `${API_URL}/${id_tramite}`
  );

  console.log(response.data);

  return response.data.data;
};

export const reservarHorario =
  async (id_horario: number) => {

    const response = await axios.put(
      `${API_URL}/${id_horario}`
    );

    return response.data;
};