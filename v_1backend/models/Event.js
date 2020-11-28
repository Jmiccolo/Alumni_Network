const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    Date: String,
    Title: String,
    Description: String,
    Creator: { type: mongoose.Schema.Types.ObjectId, ref: "Alumni" },
    Created_at:{type:String, default:Date.now()}
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;