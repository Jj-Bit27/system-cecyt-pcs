import axios from "./axios";

export const getArticulosRequest = async () =>
  axios.get(`/article/gets`);

export const getArticuloRequest = async (id) => axios.get(`/article/get/${id}`);

export const addArticuloRequest = async (data) => axios.post(`/article/add`, data);

export const editArticuloRequest = async (id, data) => axios.put(`/article/edit/${id}`, data);

export const deleteArticuloRequest = async (id) => axios.delete(`/article/delete/${id}`);