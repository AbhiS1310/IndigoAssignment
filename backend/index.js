import express from 'express';
import dotenv from 'dotenv';
import Connect from './db/db.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import users from './controller/users.js';
import flights from './controller/flights.js';
import notification from './controller/notification.js';
import errorHandler from './middleware/error.js';

// Configure environment variables
dotenv.config({
  path: "config/.env",
});

// Database connection
Connect();

// Initialize Express application
const app = express();

// Middleware
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
// Routes
app.use('/api/v1/auth', users);
app.use('/api/v1/notification', notification);
app.use('/api/v1/flight', flights);

// Root route
app.get('/', (req, res) => {
  res.send('<h1>Indigo is Live</h1>');
});


app.use(errorHandler);
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => 
  console.log(`Server is running at http://localhost:${PORT}`)
);
