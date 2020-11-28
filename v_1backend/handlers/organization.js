require("dotenv").config();
const db = require("../models");
const jwt = require("jsonwebtoken");

exports.getOrganizations = async function(req, res){
    await db.Organization.find({})
        .then(function(organizations){
            res.json(organizations)
        }).catch(err => {
            console.log(err)
            res.send(err);
        })
}   
exports.getOrganization = async function(req, res){
    await db.Organization.findById(req.params.organizationId)
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
        alumni.save();
        let { id, firstName } = alumni;
        let token = jwt.sign({
            id,
            firstName
        },
            process.env.SECRET_KEY
        );
        let orgObj = {
            ...req.body.org,
            administrator: alumni, 
            validatedUsers: [alumni],
            userAmount:1
        };
        let organization = await db.Organization.create(orgObj);
        alumni.organization = organization;
        alumni.save();
        return res.status(200).json({
            id,
            token
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
module.exports = exports;