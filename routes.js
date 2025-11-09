import express from 'express';
import contentService from "./controllers/contentController.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier of the article.
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         level:
 *           type: string
 *         category:
 *           type: string
 *       required:
 *         - title
 *         - content
 *
 *   responses:
 *     NotFound:
 *       description: Resource not found
 *     ServerError:
 *       description: Internal server error
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Article'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/', contentService.getContents);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Article found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Article'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/:id', contentService.getById);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Article created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 articleId:
 *                   type: string
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/', contentService.create);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update an existing article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Article updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put('/:id', contentService.update);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete an article
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Article deleted successfully
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete('/:id', contentService.delete);

/**
 * @swagger
 * /source:
 *   post:
 *     summary: Create a source article (raw data)
 *     tags: [Source Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: Source article created
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post('/source', contentService.createSourceArticle);

export default router;
