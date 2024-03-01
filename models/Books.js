const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")
// basic collection for testing porpose
// "BookID": 1000,
// 		"BookName": "Book 1",
// 		"NumberOfCopies": 2
const BookSchema= new mongoose.Schema({
    BookID:{
        type:Number,
    },
    BookName:{
        type:String,
    },
    NumberOfCopies:{
        type:Number
    },
    
})


module.exports = mongoose.model("book", BookSchema);