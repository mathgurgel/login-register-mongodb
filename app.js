import express from "express";
import User from "./models/User.js"; // Make sure to create the User model file first
import path from "path"
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the public directory (frontend)
app.use(express.static(path.join(path.resolve(), 'public')));

// Register route
app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        if (error.code === 11000) { // Duplicate username
            res.status(400).json({ message: "Username already exists" });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
});

// Login route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default app;