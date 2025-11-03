import express from 'express';
import contentService from "./controllers/contentController.js";

const router = express.Router();

router.get('/contents/:id', contentService.getById);
router.put('/contents/:id', contentService.update);
router.delete('/contents/:id', contentService.delete);
router.post('/contents', contentService.create);
router.get('/contents', contentService.getAllContents);

export default router;