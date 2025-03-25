import axios from "axios";

/* La url del servidor */
const API_URL = `${process.env.API_URL}`;
console.log(API_URL);

/* Crear una instancia de axios */
const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export default instance;