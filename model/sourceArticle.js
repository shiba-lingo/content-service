import mongoose, {Schema, Types} from 'mongoose';

const SOURCES = ['BBC']

const sourceArticleSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required.'],
        maxlength: [100, 'Title cannot be more than 200 characters.'],
    },

    content: {
        type: String,
        required: [true, 'Article content is required.'],
    },

    sourceUrl: {
        type: String,
        required: [true, 'source_url is required.'],
    },

    imageUrl: {
        type: String,
    },

    source: {
        type: String,
        required: [true, 'source is required.'],
        enum: {
            values: SOURCES,
            message: '{VALUE} is not a supported source.',
        },
    },

    publishedAt: { type: Date },
}, { timestamps: true, versionKey: false });


const SourceArticle = mongoose.model('sourceArticle', sourceArticleSchema);
export default SourceArticle;