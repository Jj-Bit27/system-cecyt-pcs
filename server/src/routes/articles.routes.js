/* Importamos la biblioteca */
import express from 'express';

/* Importamos otros archivos */
import {
  getArticles,
  getArticle,
  addArticle,
  editArticle,
  deleteArticle
} from '../controllers/articles.controller.js';

const router = express.Router();

router.get('/gets', getArticles);
router.get('/get/:id', getArticle);
router.post('/add', addArticle);
router.put('/edit/:id', editArticle);
router.delete('/delete/:id', deleteArticle);

export default router;