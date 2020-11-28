var mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:"Alumni"},
    token:{type:String, required:true},
    createdAt:{type:Date, required:true, default:Date.now, expires: 600}
})

let Token = mongoose.model('Token', TokenSchema);

module.exports = Token;