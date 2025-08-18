const express = require("express");
const router = express.Router();
const { createUser, loginUser, currentUser, getUser } = require("../controllers/usersController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/users/register", createUser);

router.post("/users/login", loginUser);

router.get("/users/current", validateToken, currentUser);

router.get("/users/:email", getUser);

module.exports = router;