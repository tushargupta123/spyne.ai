const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());


// Connect to MongoDB
connectDB();


// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Car Management API',
      version: '1.0.0',
      description: 'API for managing cars and users'
    },
    servers: [
      { url: 'https://spyne-ai-seven.vercel.app/api' }, // Update this to match your deployed URL
    ],
  },
  apis: ['./routes/*.js'], // Update the path to your route files if needed
};

// Initialize Swagger
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
