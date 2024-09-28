const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username :{
      type : String ,
      required : [ true , "user is required"] ,
      trim : true
    } ,
    email : {
        type : String ,
        required : [ true , 'email is required'],
        trim : true 
    } ,
    password : {
        type : String ,
        required : [ true , 'email is required'],
    } ,

})

module.exports = mongoose.model('user' , userSchema);