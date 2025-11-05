import mongoose from 'mongoose';
import Article from './article.js';

class ArticleRepository {
    async create(data) {
        try {
            const article = new Article(data);
            return article.save();
        } catch (error) {
            console.error(error.error);
            return null;
        }
    }

    async findById(id) {
        try {
            return Article.findById(id);
        } catch (error) {
            console.error(error.error);
            return null;
        }
    }

    async find(query) {
        try {
            return Article.find(query);
        } catch (error) {
            console.error(error.error);
            return null;
        }
    }

    async updateById(id, newData) {
        try {
            return Article.findOneAndUpdate({_id: this.getObjectId(id)}, newData, {new: false});
        } catch (error) {
            console.error(error.error);
            return null;
        }
    }

    async delete(id) {
        try {
            return Article.findByIdAndDelete(id);
        } catch (error) {
            console.error(error.error);
            return null;
        }
    }

    getObjectId(id) {
        return new mongoose.Types.ObjectId(id);
    }
}

export default new ArticleRepository();
