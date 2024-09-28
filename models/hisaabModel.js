const mongoose = require('mongoose');

const hisaabSchema = mongoose.Schema({
    user :{
      type : mongoose.Schema.Types.ObjectId,
      ref : "user"
    } ,
    title : {
        type : String ,
        required : [ true , "title is required "],
        trim : true ,
    },
    data : {
        type : String ,
        required : [ true , " data is required "],
    },
    editable : {
        type : Boolean ,
        default : true ,
    },
    isEncrypted : {
        type : Boolean ,
        default : false 
    },
    passcode : {
        type : String ,
    },
    shareable : {
        type : Boolean ,
        default : false 
    }, 
},{
    timestamps : true ,
})

module.exports = mongoose.model('hisaab' , hisaabSchema);