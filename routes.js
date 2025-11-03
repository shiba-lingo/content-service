import express from 'express';
import contentService from "./controllers/contentController.js";

const router = express.Router();

router.get('/:id', contentService.getById);
router.put('/:id', contentService.update);
router.delete('/:id', contentService.delete);
router.post('/', contentService.create);
router.get('/', contentService.getContents);

router.post('/source', contentService.createSourceArticle);

export default router;