var express = require("express");
var router = express.Router();
var {getAlumnis, getAlumni, updateAlumni, deleteAlumni} = require("../handlers/alumni");

router.route("/")
.get(getAlumnis)

router.route("/:AlumniId", )
.get(getAlumni)
.put(updateAlumni)
.delete(deleteAlumni)


module.exports = router;