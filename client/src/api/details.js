import axios from "./axios";

export const getDetallesRequest = async (computadora_id) =>
  axios.get(`/detail/gets/${computadora_id}`);

export const getDetallesByIdRequest = async (id) => axios.get(`/detail/get/${id}`);

export const addDetalleRequest = async (data) => axios.post(`/detail/add`, data);

export const editDetalleRequest = async (id, data) => axios.put(`/detail/edit/${id}`, data);

export const deleteDetalleRequest = async (id) => axios.delete(`/detail/delete/${id}`);