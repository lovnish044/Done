const mongoose = require("mongoose");

const MemberSchema= new mongoose.Schema({
    MemberID:{
        type:Number,
    },
    MemberName:{
        type:String,
    },
    dueDate:{
        type:Date
    }
})


module.exports = mongoose.model("member", MemberSchema);