/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  getDetails,
  getDetailByID,
  addDetail,
  editDetail,
  deleteDetail
} from '../controllers/detail.controller.js';

const router = express.Router();

router.get('/gets/:computer_id', getDetails);
router.get('/get/:id', getDetailByID);
router.post('/add', addDetail);
router.put('/edit/:id', editDetail);
router.delete('/delete/:id', deleteDetail);

export default router;