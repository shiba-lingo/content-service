import swaggerJsdoc from 'swagger-jsdoc';
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Content API',
            version: '1.0.0',
            description: 'API documentation for managing articles and source articles.',
        },
        servers: [
            {
                url: `http://localhost:${ PORT }/`,
                description: 'Local server',
            },
        ],
    },
    apis: ['./routes.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
