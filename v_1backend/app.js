require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require("./handlers/error");
var dbRoutes = require('./routes/db');
var authRoutes = require('./routes/auth');
// var googleRoutes = require('./routes/google');
var organizationRoutes = require('./routes/organization');
const { loginRequired } = require("./middleware/auth");
 
const PORT = process.env.PORT

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/api/alumni", loginRequired, dbRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/google", googleRoutes);
app.use("/api/organizations", organizationRoutes);
app.use(function(req, res, next){
    let err = new Error("Not Found")
    err.status = 404;
    next(err)
});

app.use(errorHandler);

app.listen(PORT, function(){
    console.log(`App is running on PORT ${PORT}`);
});



