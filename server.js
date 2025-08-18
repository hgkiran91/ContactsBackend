const express = require("express");
const dotenv = require("dotenv").config();
const dbConnect = require('./config/dbconnection');
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');

const app = express();

const port = process.env.PORT || 8000;

// Middleware which helps to parse the data stream from the client server
app.use(express.json());
app.use(errorHandler);
app.use(cors());

// app.use are known as middlewares
app.use('/api/v1', require("./routes/contactsroutes"));
app.use('/api/v1', require("./routes/usersRoutes"));

app.listen(port, () => {
    console.log("Server connected successfully!👏");
});