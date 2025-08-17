const expressAsyncHandler = require("express-async-handler");
const Response = require("../constants");
const Users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

// @desc Register a user
// @route POST /api/v1/user
// @access public
const createUser = expressAsyncHandler(async (req, res) => {
    const {email, password } = req.body;
    let userName = req.body.userName;
    userName = userName.toLowerCase();
    if (!userName || !email || !password) {
        res.json({ message: Response.Message.BAD_REQUEST });
    }
    const userAvailable = await Users.findOne({
        where: { email: email }
    });
    if (userAvailable) {
        console.log("User: ", userAvailable);
        res.json({ Status: Response.Message.UNAUTHORIZED, message: "User Exists!", data: userAvailable });
    } else {
        // If user not available then create a user with hashed password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // console.log("Hash Password: ", hashedPassword);
        const user = await Users.create({
            userName,
            email,
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        if (user) {
            res.status(200).json({ _id: user.userId, userName: user.userName, email: user.email, message: "Added new User" });
        } else {
            res.status(Response.Status.BAD_REQUEST).json({ message: Response.Message.BAD_REQUEST });
        }
    }
});

// @desc Register a user
// @route POST /api/v1/user
// @access public
const loginUser = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ message: Response.Message.BAD_REQUEST });
    }
    const user = await Users.findOne({
        where: { email: email },
        raw: true,
    });
    // compare password with hassed password
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                userName: user.userName,
                email: user.email,
                userId: user.userId
            }
        },
            process.env.ACCESS_SECRET_TOKEN,
            { expiresIn: "2m" }
        )
        res.status(Response.Status.OK).json({ message: "User Login Successfully.👍", accessToken, result: true, data: user });
    } else {
        res.status(Response.Status.BAD_REQUEST).json({ message: Response.Message.BAD_REQUEST, result: false });
    }
});

// @desc Register a user
// @route POST /api/v1/user
// @access public
const currentUser = expressAsyncHandler(async (req, res) => {
    res.json({ message: "Current User Information", data: req.user });
});

const getUser = expressAsyncHandler(async (req, res) => {
    const email = req.params;
    const userDetails = await Users.findOne({
        where: {
            email: email
        }
    });
    if (userDetails) {
        res.status(Response.Status.OK).json({ message: Response.Message.OK, data: userDetails });
    } else {
        res.status(Response.Status.INTERNAL_SERVER_ERROR).json({ message: Response.Message.INTERNAL_SERVER_ERROR });
    }
})

module.exports = { createUser, loginUser, currentUser, getUser }