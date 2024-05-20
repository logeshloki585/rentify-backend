const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName : {
        type: String,
        required : true
    }, 
    lastName :{
        type: String,
        required : true,
    },
    email :{
        type: String,
        required : true,
        unique: true
    },
    phoneNumber :{
        type: Number,
        required : true,
        unique: true
    },
    password :{
        type: String,
        required : true,
        minlength: 3
    }
})

module.exports = mongoose.model("UserModel",userSchema);