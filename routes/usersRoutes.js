const express = require("express");
const router = express.Router();
const { createUser, loginUser, currentUser, getUser } = require("../controllers/usersController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

router.get("/:email", getUser);

module.exports = router;