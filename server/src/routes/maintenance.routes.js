/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  getMaintenances,
  getMaintenance,
  addMaintenance,
  editMaintenance,
  deleteMaintenance
} from '../controllers/maintenance.controller.js';

const router = express.Router();

router.get('/gets/:computer_id', getMaintenances);
router.get('/get/:id', getMaintenance);
router.post('/add', addMaintenance);
router.put('/edit/:id', editMaintenance);
router.delete('/delete/:id', deleteMaintenance);

export default router;