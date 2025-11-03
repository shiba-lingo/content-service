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

    async create(req, res) {
        try {
            const article = await articleRepository.create(req.body);
            res.status(201).json({ articleId: article.id });
        } catch (error) {
            this._handleError(res, error, "Failed to create article.");
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            if (!id || Object.keys(updatedData).length === 0) {
                return res.status(400).json({ message: 'Article id and updated data are required' });
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

    async getAllContents(req, res) {
        try {
            const level = req.query.name;
            const category = req.query.age;

            let query = {}
            if (level && category) query = { level, category };
            else if (level) query = { level };
            else if (category) query = { category };

            const articles = await articleRepository.find(query);
            res.status(200).json({ data: articles });
        } catch (error) {
            this._handleError(res, error, "Failed to retrieve all articles.");
        }
    }

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


    async delete(req, res) {
        const { id } = req.params;
        try {
            await articleRepository.delete(id);
            res.status(204).send({ message: 'Article deleted successfully.' });
        } catch (error) {
            this._handleError(res, error, "Failed to delete article.");
        }
    }
}

export default new ContentController();