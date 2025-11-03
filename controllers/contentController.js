import articleRepository from "../data/articleRepository.js";
import LikedArticle from "../data/likeArticle.js";

class ContentController {
    // Helper function to handle Mongoose/MongoDB CastErrors (e.g., invalid ID format)
    _handleError(res, error, defaultMessage = "Server error.") {
        console.error("Database or Server Error:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID format.' });
        }
        res.status(500).json({ message: defaultMessage });
    }

    /**
     * @api {post} /contents 0. Create Article
     * @apiName CreateContent
     * @apiGroup Content
     * @apiDescription Creates a new article document.
     * @apiBody {String} title Title of the article.
     * @apiBody {String} content Main body text of the article.
     * @apiBody {String} category Must be 'Technology' or 'History'.
     * @apiBody {String} english_level Must be 'Easy', 'Medium', or 'Hard'.
     * @apiBody {String} [author] Name of the author.
     *
     * @apiParamExample {json} Request-Example:
     * {
     *    "title": "The Rise of Artificial General Intelligence",
     *    "content": "AGI represents the theoretical future of AI...",
     *    "category": "Technology",
     *    "english_level": "Hard",
     *    "author": "Dr. Smith"
     * }
     *
     * @apiSuccess (Success 201) {String} data The ID of the newly created article.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 201 Created
     * { "articleId": "654c609c1d32906852a3b01e" }
     *
     * @apiError (Error 4xx) 400 Validation Error (e.g., missing fields, bad enum).
     * @apiErrorExample {json} Error-400-Validation-Response:
     * HTTP/1.1 400 Bad Request
     * { "message": "Article validation failed: category must be 'Technology' or 'History'." }
     *
     * @apiError (Error 5xx) 500 Server Error for unexpected database issues.
     * @apiErrorExample {json} Error-500-Server-Response:
     * HTTP/1.1 500 Internal Server Error
     * { "message": "Failed to create article." }
     * @apiSampleRequest http://localhost:3000/user/:id
     */
    async create(req, res) {
        try {
            const article = await articleRepository.create(req.body);
            res.status(201).json({ articleId: article.id });
        } catch (error) {
            this._handleError(res, error, "Failed to create article.");
        }
    }

    /**
     * @api {put} /contents/:id 1. Update Article
     * @apiName UpdateContent
     * @apiGroup Content
     * @apiDescription Updates an existing article using its unique MongoDB ID. Only fields provided in the body will be updated.
     *
     * @apiParam {String} id Article's unique MongoDB ID.
     * @apiBody {String} [title] New title of the article.
     * @apiBody {String} [content] New main body text of the article.
     * @apiBody {String} [category] New category ('Technology' or 'History').
     * @apiBody {String} [english_level] New English level ('Easy', 'Medium', or 'Hard').
     *
     * @apiParamExample {path} Path-ID-Example:
     * /contents/654c609c1d32906852a3b01e
     *
     * @apiParamExample {json} Request-Body-Example:
     * {
     *    "_id": "654c609c1d32906852a3b01e",
     *    "title": "The Basics of Binary Code", // updated
     *    "content": "Binary code is a two-symbol system...",
     *    "category": "Technology",
     *    "english_level": "Medium",
     *    "author": "Jane Doe"
     * }
     *
     * @apiSuccess (Success 200) {Object} data The updated article document.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *    "_id": "654c609c1d32906852a3b01e",
     *    "title": "The Basics of Binary Code",
     *    "content": "Binary code is a two-symbol system...",
     *    "category": "Technology",
     *    "english_level": "Medium",
     *    "author": "Jane Doe"
     * }
     *
     * @apiError (Error 4xx) 400 Missing ID or Empty Body.
     * @apiErrorExample {json} Error-400-Missing-Data:
     * HTTP/1.1 400 Bad Request
     * { "message": "Article id and updated data are required" }
     *
     * @apiError (Error 4xx) 400 Invalid ID format.
     * @apiError (Error 4xx) 404 Not Found if the article ID does not exist.
     * @apiErrorExample {json} Error-404-Response:
     * HTTP/1.1 404 Not Found
     * { "error": "Article records not found for the given articleId 654c609c1d32906852a3b01e" }
     *
     * @apiError (Error 5xx) 500 Server Error for unexpected database issues.
     */
    async update(req, res) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            if (!id || Object.keys(updatedData).length === 0) {
                return res.status(400).json({ message: 'Article id and updated data are required' });
            }

            if (id.length !== 24) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            const article = await articleRepository.findOneAndUpdate({ _id: articleRepository.getObjectId(id)}, updatedData);
            if (!article) {
                return res.status(404).json({ error: `Article records not found for the given articleId ${id}` });
            }
            res.status(200).json(article);
        } catch (error) {
            this._handleError(res, error, "Failed to create article.");
        }
    }

    /**
     * @api {get} /contents 2. Get All Contents
     * @apiName GetAllContents
     * @apiGroup Content
     * @apiDescription Retrieves a list of all articles in the database.
     *
     * @apiSuccess (Success 200) {Object[]} data List of all article documents.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *    data": [
     *       { "_id": "654c609c1d32906852a3b01e", "title": "The Basics of Binary Code", "content": "This is a story ...", "category": "Technology", "english_level": "Easy", "author": "Ann" },
     *       { "_id": "654c609c1d32906852a3b01f", "title": "Understanding the Roman Republic", "content": "This is a story ...", "category": "History", "english_level": "Medium", "author": "Una" }
     *    ]
     * }
     *
     * @apiError (Error 5xx) 500 Server Error for unexpected database issues.
     * @apiErrorExample {json} Error-500-Server-Response:
     * HTTP/1.1 500 Internal Server Error
     * { "message": "Failed to retrieve all articles." }
     *
     * @apiSampleRequest http://localhost:3000/contents
     */
    async getAllContents(req, res) {
        try {
            const articles = await articleRepository.find({});
            res.status(200).json({ data: articles });
        } catch (error) {
            this._handleError(res, error, "Failed to retrieve all articles.");
        }
    }

    /**
     * @api {get} /contents/:id 3. Get Article by ID
     * @apiName GetById
     * @apiGroup Content
     * @apiDescription Retrieves a single article using its unique MongoDB ID.
     *
     * @apiParam {String} id Article's unique MongoDB ID.
     *
     * @apiParamExample {path} Example-ID:
     * /contents/654c609c1d32906852a3b01e
     *
     * @apiSuccess (Success 200) {Object} data The requested article document.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * {
     *    "data": {
     *       "_id": "654c609c1d32906852a3b01e",
     *       "title": "The Basics of Binary Code",
     *       "content": "Binary code is a two-symbol system...",
     *       "category": "Technology",
     *       "english_level": "Easy",
     *       "author": "Jane Doe"
     *    }
     * }
     *
     * @apiError (Error 4xx) 404 Not Found if the article ID does not exist.
     * @apiErrorExample {json} Error-404-Response:
     * HTTP/1.1 404 Not Found
     * { "message": "Article not found." }
     *
     * @apiError (Error 4xx) 400 Invalid ID format.
     * @apiErrorExample {json} Error-400-ID-Response:
     * HTTP/1.1 400 Bad Request
     * { "message": "Invalid ID format." }
     *
     * @apiError (Error 5xx) 500 Server Error for unexpected database issues.
     */
    async getById(req, res) {
        try {
            const id = req.params.id;
            if (!id || id.length !== 24) {
                return res.status(400).json({ message: 'Invalid ID format.' });
            }

            const article = await articleRepository.findById(id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found.' });
            }
            res.status(200).json({ data: article });
        } catch (error) {
            this._handleError(res, error, "Failed to retrieve article.");
        }
    }


    /**
     * @api {delete} /contents/:id 15. Delete Article by ID
     * @apiName DeleteContent
     * @apiGroup Content
     * @apiDescription Deletes a single article using its unique MongoDB ID.
     *
     * @apiParam {String} id Article's unique MongoDB ID.
     *
     * @apiParamExample {path} Example-ID:
     * /contents/654c609c1d32906852a3b01e
     *
     * @apiSuccess (Success 204) 204 No Content. Indicates successful deletion.
     * @apiSuccessExample {json} Success-Response: Article deleted successfully.
     * HTTP/1.1 204 No Content
     *
     * @apiError (Error 4xx) 404 Not Found if the article ID does not exist.
     * @apiErrorExample {json} Error-404-Response:
     * HTTP/1.1 404 Not Found
     * { "message": "Article not found." }
     *
     * @apiError (Error 4xx) 400 Invalid ID format.
     * @apiErrorExample {json} Error-400-ID-Response:
     * HTTP/1.1 400 Bad Request
     * { "message": "Invalid ID format." }
     *
     * @apiError (Error 5xx) 500 Server Error for unexpected database issues.
     */
    async deleteContent(req, res) {
        const { id } = req.params;
        try {
            const article = await articleRepository.delete(id);

            if (!article) {
                return res.status(404).json({ message: 'Article not found.' });
            }
            res.status(204).send({ message: 'Article deleted successfully.' });
        } catch (error) {
            this._handleError(res, error, "Failed to delete article.");
        }
    }

    /**
     * @api {get} /contents/:articleId/like-count 16. Get Like Count by Article
     * @apiName GetArticleLikeCount
     * @apiGroup Content
     * @apiDescription Given an article ID, returns the total number of users who have liked it.
     *
     * @apiParam {String} articleId Article's unique MongoDB ID.
     *
     * @apiParamExample {path} Example-ArticleId:
     * /contents/654c609c1d32906852a3b01e/like-count
     *
     * @apiSuccess (Success 200) {Object} data Object containing the article ID and the like count.
     * @apiSuccessExample {json} Success-Response:
     * HTTP/1.1 200 OK
     * { "articleId": "654c609c1d32906852a3b01e", "count": 15 }
     *
     * @apiError (Error 4xx) 400 Invalid Article ID format.
     * @apiErrorExample {json} Error-400-ID-Response:
     * HTTP/1.1 400 Bad Request
     * { "message": "Invalid ID format." }
     *
     * @apiError (Error 5xx) 500 Server Error for unexpected database issues.
     */
    async getArticleLikeCount(req, res) {
        try {
            const { articleId } = req.params;
            if (!articleId || articleId.length !== 24) {
                return res.status(400).json({ message: 'Invalid ID format.' });
            }

            const result = await LikedArticle.find({ articleId }, { _id: 1 });
            res.status(200).json({ articleId: articleId, count: result.length });
        } catch (error) {
            this._handleError(res, error, "Error getting like count.");
        }
    }
}

export default new ContentController();