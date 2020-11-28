const express = require("express")
const router  = express.Router();
const {getOrganizations, getOrganization, createOrganization} = require("../handlers/organization");

router.get("/", getOrganizations);
router.get("/:organizationId", getOrganization);
router.post("/new", createOrganization);

module.exports = router;