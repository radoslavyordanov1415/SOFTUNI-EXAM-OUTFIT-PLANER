import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware configuration
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));

// Routes configuration
app.use('/auth', authRoutes)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

// Start the server
const PORT = process.env.PORT || 5002; // Ensure this matches your .env
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
});
