// "eventtype": "checkout",
// "book_id": 1000,
// "member_id": 2000,
// "date": "2023-05-18"
const mongoose = require("mongoose");

const ResultSchema= new mongoose.Schema({
    book_id:{
        type:Number,
    },
    eventtype:{
        type:String,
    },
    member_id:{
        type:String,
    },
    date:{
        type:Date
    }
})


module.exports = mongoose.model("result", ResultSchema);