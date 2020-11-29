var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var AlumniSchema = new mongoose.Schema({
            firstName:{type: String},
            lastName:{type:String},
            address:{type: String, select:false},
            city:{type:String, select:false},
            zip:{type:Number, select:false},
            chapter:String,
            initiation:String,
            email:{type:String, required:true, unique:true},
            profileImgURL: String, 
            canContact: {type:Boolean, default:false},
            password:{type:String, required:true, select:false},
            username:{type:String, unique:true},
            googleId:{type:String, select:false};
            calendar:{type:mongoose.Schema.Types.ObjectId, ref:"Calendar"},
            organization:{type:mongoose.Schema.Types.ObjectId, ref:"Organization"},
            association:{type:mongoose.Schema.Types.ObjectId, ref:"Association"},
            messages:[{type:mongoose.Schema.Types.ObjectId, ref:"Message"}],
            isVerified:{type:Boolean, default:false, select:false}
})

AlumniSchema.pre("save", async function(next){

    try{if(!this.isModified("password")){
        return next();
    }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword
        return next();
    }catch (err){
        return next(err);
    }
});
AlumniSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        return next(err);
    }
}
let Alumni = mongoose.model('Alumni', AlumniSchema);

module.exports = Alumni;