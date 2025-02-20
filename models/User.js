const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type : String,
        required : true,
        trim : true
    },
    email:{
        type : String,
        required : true,
        trim : true
    },
    password:{
        type : String,
        required : true,
        trim : true
    },
    role:{
        type : String,
        default : "user",
        enum : ["user", "admin"]
    }
});

module.exports = mongoose.model("User", UserSchema);