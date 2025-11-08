import mongoose, {Schema, Types} from 'mongoose';

const CATEGORIES = ['technology', 'history', 'news']
const LANGUAGE_LEVELS = ['easy', 'medium', 'hard']

const articleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        maxlength: [100, 'Title cannot be more than 200 characters.'],
    },

    content: {
        type: String,
        required: [true, 'Article content is required.'],
    },

    summary: {
        type: String,
        required: [true, 'Article content is required.'],
    },

    imageUrl: {
        type: String,
    },

    category: {
        type: String,
        required: [true, 'Category is required.'],
        enum: {
            values: CATEGORIES, // Enforce specific categories
            message: '{VALUE} is not a supported category.',
        },
    },

    level: {
        type: String,
        required: [true, 'English level is required.'],
        enum: {
            values: LANGUAGE_LEVELS,
            message: 'Level must be one of Easy, Medium, Hard.',
        },
    },

    sourceId: {
        type: Types.ObjectId,
        required: [true, 'SourceId is required.'],
    }
}, { timestamps: true, versionKey: false });


const Article = mongoose.model('article', articleSchema);
export default Article;