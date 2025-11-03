import express from 'express';
import contentService from "./controllers/contentController.js";

const router = express.Router();

router.get('/contents/:id', contentService.getById);
router.put('/contents/:id', contentService.update);
router.delete('/contents/:id', contentService.deleteContent);
router.post('/contents', contentService.create);
router.get('/contents', contentService.getAllContents);
// router.get('/contents/:articleId/like-count', contentService.getArticleLikeCount);

export default router;