const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const JWT_SECRET = process.env.JWT_SECRET;

function registerUser() {
    return async (req, res, next) => {     //declaring a section of that is non-blocking
        try {
            const { name, email, mobile, password } = req.body;
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                const error = new Error('User already exist with this email');
                error.statusCode = 400;
                throw error;
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
                    name,
                    email,
                    mobile,
                    password: hashedPassword,
                });

                await newUser.save();
                res.status(201).json({
                    message: 'User created successfully',
                    user: newUser
                });
            }
        } catch (error) {
            next({
                message: "Error Creating User",
                error
            });
        }
    };
}

function handleLogin() {
    return async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                const passwordCheck = await bcrypt.compare(password, existingUser.password);
                if (passwordCheck) {
                    const token = jwt.sign(
                        { userID: existingUser._id }, //PAYLOAD : an object you want to convert to string/token
                        JWT_SECRET, // Secret Key : that is being used for encrption and validation signature
                        // { expiresIn: '1h' } Optional argument, to make the token temporary
                    )
                    res.status(200).json({
                        message: "Login Successful",
                        email: existingUser.email,
                        id: existingUser._id,
                        token
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
    };
}

module.exports = {
    registerUser,
    handleLogin
};