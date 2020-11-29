const express = require("express")
const router  = express.Router();
const {getOrganizations, getOrganization, createOrganization, validateOrganization} = require("../handlers/organization");

router.get("/", getOrganizations);
router.get("/:organizationId", getOrganization);
router.post("/new", createOrganization);
router.post("/validate", validateOrganization);

module.exports = router;