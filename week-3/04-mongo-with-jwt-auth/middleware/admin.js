// Middleware for handling auth
const{ Admin }=require("../db")
const jwt = require("jsonwebtoken")
const {jwtpassword}=require("../config")

function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected

    const token = req.headers.authorization
    const ans = jwt.verify(token,jwtpassword)
    const username = ans.username
    
    Admin.findOne({
        username:username
    })
    .then(function(value){
        if(value){
            next()
        }else{
            res.json({
                msg:"Admin not found"
            })
        }
    })
}

module.exports = adminMiddleware;