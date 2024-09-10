import express from "express";
const router = express.Router();
import User from "../models/User.js";

// Register route
router.post("/register", async (req, res) => {
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
async function loginPost(req, res) {
    console.log("loginPost");
    try {
        const { username, password } = req.body;
        console.log("username", username);
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
router.post("/login", loginPost);

export default router;