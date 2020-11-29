require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");

exports.getOrganizations = async function(req, res){
    await db.Organization.find({})
        .then(function(organizations){
            res.json(organizations.map(val=>{return {name:val.name, id:val.id}}));
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
}   
exports.getOrganization = async function(req, res){
    await db.Organization.findById(req.body.id)
    .then(function(organization){
        res.json(organization);
    })
    .catch(err=> {
        console.log(err);
        res.send(err);
    })
}

exports.createOrganization = async function(req, res, next){
    try {
        console.log(req.body.org);
        if (!req.body.admin.password || !req.body.admin.firstName) {
            return next({
                status: 400,
                message: "Please fill in all fields"
            });
        }
        let alumni = await db.Alumni.create(req.body.admin);
        alumni.calendar = await db.Calendar.create({
            name: alumni.id
        });
        let { id, username, email } = alumni;
        let token = jwt.sign({
            id,
            username
        },
            process.env.SECRET_KEY
        );
        let organization = await db.Organization.create(req.body.org);
        alumni.organization = organization;
        alumni.save();
        organization.administrator = alumni;
        organization.validatedUsers.push(alumni);
        organization.save();
        let verifyToken = await db.Token.create({userId:alumni._id, token:jwt.sign({id, email}, process.env.SECRET_KEY)});
        return res.status(200).json({
            id,
            token,
            verifyToken:verifyToken.token
        });
    } catch (err) {
        console.log(err);
        // if a validation fails
        if (err.code === 11000) {
            err.message = "Sorry, that username and/or email is taken";
        }
        return next({
            status: 400,
            message: err.message
        });
    }
}

exports.validateOrganization = async function(req, res,){
    try{
        let alumni = await db.Alumni.findById(req.body.id);
        let organization = await db.Organization.findById(alumni.organization);
        if(organization.validatedUsers.includes(alumni._id)){
            res.json({isValidated:true, organization});
        }else{
            res.json({isValidated:false, organization:null});
        }
    }
    catch{
        res.json({isValidate:false, organization:null});
    }
}
module.exports = exports;