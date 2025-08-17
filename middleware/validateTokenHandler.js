const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Response = require("../constants");

const validateToken = expressAsyncHandler( async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    console.log("Auth Token: ", authHeader);
    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // console.log("Token: ", token);
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, decoded) => {
            if(err){
                res.status(Response.Status.UNAUTHORIZED).json({message: Response.Message.UNAUTHORIZED});
            }
            console.log("Decoded data:", decoded);
            req.user = decoded.user;
            next();
        });

        if(!token) {
            res.status(Response.Status.UNAUTHORIZED).json({message: Response.Message.UNAUTHORIZED});
        }
    }
});

module.exports = validateToken;