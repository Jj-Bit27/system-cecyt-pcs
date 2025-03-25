import axios from "./axios";

export const getMantenimientosRequest = async (computadora_id) =>
  axios.get(`/maintenance/gets/${computadora_id}`);

export const getMantenimientoRequest = async (id) => axios.get(`/maintenance/get/${id}`);

export const addMantenimientoRequest = async (data) => axios.post(`/maintenance/add`, data);

export const editMantenimientoRequest = async (id, data) => axios.put(`/maintenance/edit/${id}`, data);

export const deleteMantenimientoRequest = async (id) => axios.delete(`/maintenance/delete/${id}`);