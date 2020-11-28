const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    name: {type:String, unique:true},
    userAmount: {type:Number, default: 0},
    hq: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    address: String,
    website: {type:String, unique: true},
    email: {type:String, unique:true},
    calendar: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
    administrator: { type: mongoose.Schema.Types.ObjectId, ref: "Alumni"},
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    validatedAssociations:[{type: mongoose.Schema.Types.ObjectId, ref:"Association"}],
    validatedEmails: [String],
    validatedUsers: [{type: mongoose.Schema.Types.ObjectId, ref: "Alumni"}],
    attemptedValidation: [{firstName:String, lastName:String, email:String}],
    tagline:String,
    colors:[String]
})

OrganizationSchema.pre("save", function(){
    this.userAmount = this.validatedUsers.length;
})

const Organization = mongoose.model("Organization", OrganizationSchema);
module.exports = Organization;