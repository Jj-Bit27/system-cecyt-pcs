/* Importamos bibliotecas */
import express from "express";
import cors from "cors";

/* Rutas */
import detailRoute from './routes/detail.routes.js'
import articleRoute from './routes/articles.routes.js'
import maintenanceRoute from './routes/maintenance.routes.js'

const server = express() // Inicializamos el servidor
const port = 5000 // Puerto

const corsOptions = {
  origin: (origin, callback) => {
    // ✅ Permitir cualquier origen o solicitudes sin origen (como Postman)
    if (!origin || origin.includes('https')) {
      callback(null, true);
    } else {
      callback(new Error('Origen no permitido por CORS'));
    }
  },
  credentials: true, // Permitir cookies y credenciales
};

/* Hacemos que sea json la respuesta y que pueda acceder el frontend al backend */
server.use(cors(corsOptions));
server.use(express.json())

/* Rutas */
server.use('/api/detail', detailRoute)
server.use('/api/article', articleRoute)
server.use('/api/maintenance', maintenanceRoute)

/* Otras rutas que no sean las antes dichas */
server.use('*', (req, res) => {
  res.send('Hello World!')
})

/* Escuchamos el servidor */
server.listen(port, () => {
  console.log("Server is running on: " + port);
});