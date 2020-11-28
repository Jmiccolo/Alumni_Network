const express = require("express")
const router  = express.Router();
const {signin, signup, google} = require("../handlers/auth");

router.post("/signup", signup)
router.post("/signin", signin)
// router.post("/google", google)

module.exports = router;