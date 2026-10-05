
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import db from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

// Get current file directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Middleware
app.use(cors());
app.use(express.json());


// API Routes
app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);


// Static folder for uploaded images
app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);


// Home Route
app.get("/", (req, res) => {
    res.json({
        message: "EventHub API is running"
    });
});


// Test Database Connection
app.get("/api/test-db", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT 1 AS result"
        );

        res.json({
            success: true,
            message: "MySQL connected successfully",
            data: rows
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "MySQL connection failed"
        });

    }

});


export default app;

