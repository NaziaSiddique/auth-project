const express = require("express");
const router = express.Router();
const authService = require("../services/authService");

router.post("/register", async (req, res) => {
    try {
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

module.exports = router;