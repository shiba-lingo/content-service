import mongoose, { Schema } from 'mongoose';

const articleSchema = new Schema({
    // Unique Article Title
    title: {
        type: String,
        required: [true, 'Title is required.'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters.'],
    },

    // The main content of the article
    content: {
        type: String,
        required: [true, 'Article content is required.'],
        minlength: [50, 'Content must be at least 50 characters long.'],
    },

    // Category (used by the Learning Service for filtering/recommendation)
    category: {
        type: String,
        required: [true, 'Category is required.'],
        enum: {
            values: ['Technology', 'History', 'News'], // Enforce specific categories
            message: '{VALUE} is not a supported category.',
        },
    },

    // English Reading Level (crucial for the Learning Service)
    english_level: {
        type: String,
        required: [true, 'English level is required.'],
        enum: {
            values: ['Easy', 'Medium', 'Hard'], // Common CEFR levels
            message: 'Level must be one of Easy, Medium, Hard.',
        },
    },

    // Article Author
    author: { type: String },

}, { collation: 'article'});


const Article = mongoose.model('article', articleSchema);
export default Article;