import express from 'express';
import dotenv from 'dotenv';
import Connect from './database/db.js';
import cors from 'cors';
import morgan from 'morgan';
import users from './controller/users.js';
import flights from './controller/flights.js';
import notification from './controller/notification.js';

// Configure environment variables
dotenv.config();

// Database connection
Connect();

// Initialize Express application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', users);
app.use('/api/v1/notification', notification);
app.use('/api/v1/flight', flights);

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Indigo is Live</h1>');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => 
  console.log(`Server is running at http://localhost:${PORT}`.bgCyan.white)
);
