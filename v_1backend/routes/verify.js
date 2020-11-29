const express = require("express")
const router  = express.Router();
const {verifyUser} = require("../handlers/verify");

router.post("/", verifyUser);

module.exports = router;