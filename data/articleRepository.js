import mongoose from 'mongoose';
import Article from './article.js';

class ArticleRepository {
    async create(data) {

        const article = new Article(data);
        return article.save();
    }

    async findById(id) {
        return Article.findById(id);
    }

    async find(query) {
        console.log('in findAll', Article.collection.name, query);
        return Article.find(query);
    }

    async findOneAndUpdate(query, newData) {
        return Article.findOneAndUpdate(query, newData, {new: true});
    }

    async delete(id) {
        return Article.findByIdAndDelete(id);
    }

    getObjectId(id) {
        return new mongoose.Types.ObjectId(id);
    }
}

export default new ArticleRepository();
