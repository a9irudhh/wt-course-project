const express = require("express");
const Router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

Router.post("/register", async (req, res) => {
    const { name, email, password, role, starlab } = req.body;

    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).send({ error: "User already exists" });
    }

    // Hash the password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
            return res.status(500).send({ error: "Internal server error" });
        }

        try {
            // Create new user with additional fields role and starlab
            const newUser = await User.create({
                name,
                email,
                password: hash,
                role,
                starlab,
            });
            return res.status(201).send({ user: newUser });
        } catch (err) {
            return res.status(500).send({ error: "Internal server error" });
        }
    });
});

Router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }

    // Compare password with hashed password in the database
    bcrypt.compare(password, user.password, async (err, result) => {
        if (err) {
            return res.status(500).send({ error: "Internal server error" });
        }
        if (!result) {
            return res.status(401).send({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "6h" });
        console.log("USER : ", user);
        return res.status(200).send({ token });
    });
});

module.exports = Router;
