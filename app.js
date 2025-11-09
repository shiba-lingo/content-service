import express from 'express';
import contentRouter from "./routes.js";
// import swaggerRouter from "./swagger.js";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());


const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));


const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Content API',
            version: '1.0.0',
            description: 'API documentation for content service',
        },
        servers: [
            {
                url: 'http://localhost:3000/',
            },
        ],
    },
    apis: ['./routes.js'], // adjust path
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api/content', contentRouter);

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// app.use('/docs', swaggerRouter);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});