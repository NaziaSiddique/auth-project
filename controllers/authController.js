const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authMiddleware");
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
    try {
        console.log("Incoming request body:", req.body);
        const {username, email, password } = req.body;
        const user = await authService.registerUser(username, email, password);
        res.status(201).json({ message: "User registered", user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password } = req.body;
        const token = await authService.loginUser(email, password);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get("/profile", authenticateUser, (req, res) => {
    res.json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;