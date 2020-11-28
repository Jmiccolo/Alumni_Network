var db = require('../models');
var fetch = require('node-fetch');


exports.getAlumnis = function(req, res){
    db.Alumni.find({})
    .then(function(alumnis){
        res.json(alumnis);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.getAlumni =  function(req, res){
    db.Alumni.findById(req.params.AlumniId)
    .then(function(foundAlumni){
        res.json(foundAlumni);
    })
    .catch(function(err){
        res.send(err);
    })
};

exports.updateAlumni = function(req, res){
    db.Alumni.findOneAndUpdate({_id: req.params.AlumniId}, req.body, {new:true})
    .then(function(alumni){
        res.json(alumni);
    })
    .catch(function(err){
        res.send(err);
    });
};

exports.deleteAlumni = function(req, res){
    db.Alumni.deleteOne({_id: req.params.AlumniId})
    .then(function(){
        res.json("We Deleted It");
    })
    .catch(function(err){
        res.send(err);
    });
};

module.exports = exports;