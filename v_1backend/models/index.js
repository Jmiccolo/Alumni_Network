var mongoose = require("mongoose");

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/brothers-api', 
{useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: false});
mongoose.Promise = Promise;

module.exports.Alumni = require("./Alumni");
module.exports.Organization = require("./Organization");
module.exports.Calendar = require("./Calendar");
module.exports.Event = require("./Event");
module.exports.Association = require("./Association");
module.exports.Message = require("./Message");
module.exports.Token = require("./AuthToken");
