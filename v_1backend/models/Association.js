const mongoose = require("mongoose");

const AssociationSchema = new mongoose.Schema({
    name: String,
    userAmount: Number,
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    calendar:{type:mongoose.Schema.Types.ObjectId, ref:"Calendar"},
    administrator:{type:mongoose.Schema.Types.ObjectId, ref:"Alumni"},
    messages:[{type:mongoose.Schema.Types.ObjectId, ref:"Message"}],
    validatedUsers:[{type:mongoose.Schema.Types.ObjectId, ref:"Alumni"}],

})

const Association = mongoose.model("Association", AssociationSchema);
module.exports = Association;