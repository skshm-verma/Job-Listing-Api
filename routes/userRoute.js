const express = require('express');

const router = express.Router();
const User = require('../model/User.js');

router.get('/', (req, res) => {
    res.json({
        message: 'User route is working fine',
        status: 'Working'
    })
});

router.post('/register', async (req, res) => {         //declaring a section of that is non-blocking
    const { name, email, password } = req.body;
    try {
        const newUser = new User({
            name,
            email,
            password
        })
        await newUser.save();
        //we need to handle cases where the email already exista in the database
        res.status(201).json({
            message: 'User created successfully',
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error
        })
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        User.findOne({ email, password }, (err, user) => {
            if (user) {
                res.status(200).json({
                    message: 'Login successful',
                    user
                })
            } else if (err) {
                res.status(404).json({
                    message: 'User not found',
                    error: err
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error
        })
    }
});

module.exports = router;