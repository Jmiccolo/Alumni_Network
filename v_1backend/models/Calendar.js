const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({
    name:String,
    associations:[{type:mongoose.Schema.Types.ObjectId, ref:"Association"}],
    events:[{type:mongoose.Schema.Types.ObjectId, ref:"Event"}]
})

const Calendar = mongoose.model("Calendar", calendarSchema);

module.exports = Calendar;