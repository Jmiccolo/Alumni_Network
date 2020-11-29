require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");

exports.verifyUser = async function(req, res, next){
    try{const {token} = req.body;
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    let Alumni = await db.Alumni.findById(decoded.id);
    if(Alumni.email === decoded.email){
        Alumni.isVerified = true;
        Alumni.save();
        return res.status(200).json({
            id:Alumni.id
        })
    }
}catch(err){
        console.log(err);
        return next({
            status: 400,
            message: err.message
        });
}
}

module.exports = exports;