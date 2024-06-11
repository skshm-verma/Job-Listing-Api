const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../model/User.js');
const validateNewUser = require('../middleware/validateNewUser');

router.get('/', (req, res) => {
    res.json({
        message: 'User route is working fine',
        status: 'Working'
    })
});

// third case of data missing will be handled in the middleware section
router.post('/register', validateNewUser, async (req, res, next) => {         //declaring a section of that is non-blocking
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exist with this email',
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            })

            await newUser.save();
            res.status(201).json({
                message: 'User created successfully',
                user: newUser
            })
        }
    } catch (error) {
        next({
            message: "Error Creating User",
            error
        });
    }
});

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const passwordCheck = await bcrypt.compare(password, existingUser.password);
            if (passwordCheck) {
                const token = jwt.sign(
                    { email: existingUser.email }, //PAYLOAD : an object you want to convert to string/token
                    'secret', // Secret Key : that is being used for encrption and validation signature
                    { expiresIn: '1h' } //Optional argument, to make the token temporary
                )

                res.status(200).json({
                    message: "Login Successful",
                    email: existingUser.email,
                    token,
                });
            } else {
                res.status(400).json({
                    message: "Invalid Credentials",
                });
            }
        } else {
            res.status(400).json({
                message: "User not found",
            })
        }
    } catch (error) {
        next({
            message: "Error Logging In",
            error
        });
    }
});

module.exports = router;