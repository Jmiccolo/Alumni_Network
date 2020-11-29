require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");





exports.signup = async function(req, res, next){
    try{
        console.log(req.body);
        if(!req.body.password || !req.body.username){
            return next({
                status: 400,
                message: "Please fill in all fields"
            });
        }
        let alumni = await db.Alumni.create(req.body);
        let calendar = await db.Calendar.create({
            name:alumni.id
        })
        alumni.calendar = calendar;
        alumni.save();
        let {id, username, email} = alumni;
        let token = jwt.sign({
            id, 
            username
        }, 
        process.env.SECRET_KEY
        );
        let verifyToken = await db.Token.create({ userId: alumni._id, token: jwt.sign({ id, email }, process.env.SECRET_KEY) });
        // let organization = await db.Organization.findById(alumni.organization);
        // if(!organization.validatedUsers.some(val=>alumni._id)&&!organization.validatedEmails.some(val=>alumni.email)){
        //     organization.attemptedValidation.push({firstName:alumni.firstName, lastName:alumni.lastName, email:alumni.email});
        // } else if (!organization.validatedUsers.some(val => alumni._id) && organization.validatedEmails.some(val => alumni.email)){
        //     organization.validatedUsers.push(alumni);
        // }
        // organization.save();
        return res.status(200).json({
            id,
            token,
            verifyToken
        })
    }catch(err){
        // if a validation fails
        if(err.code === 11000){
            err.message  = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}
exports.signin = async function(req, res, next){
    try{
        let alumni = await db.Alumni.findOne({
            'email':req.body.email
        })
        let{id, username} = alumni;
        let isMatch = await alumni.comparePassword(req.body.password);
        if(isMatch){
            let token = jwt.sign(
                {
                    id,
                    username
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                token
            });
        }else{
            return next({
                status:400,
                message:"Invalid Email/Password."
            })
        }
    }catch(err){
        return next({
            status:400,
            message:"Invalid Email/Password."
        })
    }
}

exports.google = async function (req, res, next) {
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
        idToken:req.body.tokenId,
        audience:process.env.CLIENT_ID
    })
    const payload = ticket.getPayload();
    if ((payload.iss === "accounts.google.com" || payload.iss === "https://accounts.google.com") && payload.aud === process.env.CLIENT_ID){
        try{
            let alumni = await db.Alumni.findOneAndUpdate(
                {
                    'email': payload.email
                }, 
                {
                    firstName: payload.given_name,
                    lastName: payload.family_name,
                    email: payload.email,
                    profileImageURL: payload.picture,
                    googleId:payload.sub,
                    organization: req.body.organization
                }, 
                {
                    upsert:true, 
                    new:true
                });
            let {id} = alumni;
            let token = jwt.sign(
                {
                    id
                },
                process.env.SECRET_KEY
            );
            return res.status(200).json({
                id,
                token
            });
        }catch(err){
            return next({
                status: 400,
                message: err.message
            });
        }
    }else{
            return next({
                status: 400,
                message: "Invalid Email/Password."
            })
    }
    

}