const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    title:{type:String, required:true},
    message:{type:String, required:true},
    created_at:{type:String, default:Date.now()},
    creator:{type:mongoose.Schema.Types.ObjectId, ref:"Alumni"},
    Association:{type:mongoose.Schema.Types.ObjectId, ref:"Association"},
    Organization:{type:mongoose.Schema.Types.ObjectId, ref:"Organization"}
})

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;