import articleRepository from "../data/articleRepository.js";
import SourceArticle from "../data/sourceArticle.js";

class ContentController {
    async create(req, res) {
        try {
            const article = await articleRepository.create(req.body);
            if (!article) {
                return res.status(500).send({ message: "Failed to create article"});
            }
            res.status(201).json({ articleId: article.id });
        } catch (error) {
            return res.status(500).send({ message: error.message});
        }
    }

    async createSourceArticle(req, res) {
        try {
            const rawArticle = new SourceArticle(req.body);
            const article = await rawArticle.save();
            res.status(201).json({ articleId: article.id });
        } catch (error) {
            return res.status(500).send({ message: error.message});
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            if (!id || Object.keys(updatedData).length === 0) {
                return res.status(400).json({ message: 'Article id and updated data are required' });
            }

            const article = await articleRepository.updateById(id, updatedData);
            if (!article) {
                return res.status(404).json({ error: `Article records not found for the given articleId ${id}` });
            }
            res.status(200).json(article);
        } catch (error) {
            return res.status(500).send({ message: error.message});
        }
    }

    async getContents(req, res) {
        try {
            const { level, category } = req.query;

            const query = {};
            if (level) query.level = level;
            if (category) query.category = category;

            const articles = await articleRepository.find(query);
            res.status(200).json({ data: articles });
        } catch (error) {
            return res.status(500).send({ message: error.message});
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const article = await articleRepository.findById(id);
            if (!article) {
                return res.status(404).json({ message: 'Article not found.' });
            }
            res.status(200).json({ data: article });
        } catch (error) {
            return res.status(500).send({ message: error.message});
        }
    }


    async delete(req, res) {
        try {
            const { id } = req.params;
            await articleRepository.delete(id);
            res.status(204).send({ message: 'Article deleted successfully.' });
        } catch (error) {
            return res.status(500).send({ message: error.message});
        }
    }
}

export default new ContentController();