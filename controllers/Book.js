const Books = require("../models/Books");
const Book = require("../models/Books");
const Member = require("../models/Member");
const Result = require("../models/Result");


const createBook = async (req,res)=>{
    try{
    const { BookID,
    BookName,
    NumberOfCopies}= req.body
    const user = await Books.create({BookID:BookID,
        BookName:BookName,
        NumberOfCopies:NumberOfCopies});
    res.status(200).json({
        success: true,
         user,
      });}
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}

const createMember = async (req,res)=>{
    try{
    const { MemberID,
        MemberName,
    }= req.body
    const user = await Member.create({
        MemberID:MemberID,
        MemberName:MemberName});
    res.status(200).json({
        success: true,
         user,
      });}
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}

const createresult = async (req,res)=>{
    try{
    const {  book_id,
    eventtype,
    member_id,
    date
    }= req.body
    const user = await Result.create({
        book_id:book_id,
        eventtype:eventtype,
        member_id:member_id,
        date:date });
    res.status(200).json({
        success: true,
         user,
      });}
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}
const checkOutBook = async (req,res)=>{
    try{
    const member_id= await Member.findById(req.query.member_id);
    const book= await Books.findById(req.query.book_id)
    const result = await Result.find({book_id:book.BookID,member_id:member_id.MemberID});
    for(let i=0;i<result.length;i++){
        if(result[i].eventtype=="checkout"){
            if(book.NumberOfCopies!=0){
                res.status(200).json({
                    success: true,
                    book,
                  });
            }
        }
        if(result[i].eventtype=="return"){
            if(book.NumberOfCopies!=0){
                res.status(200).json({
                    success: true,
                    book,
                  });
            }
        }
    }
    
   
   }
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}

async function calculateFIne(currentDate){
    let totalfine=0;
    const overDueBook= [];
    const result = await Result.find({date: {$lt: currentDate}});
    for(let i=0;i<result.length;i++){
    const overdueBooks = await Books.find({book_id:result[i].book_id})

    overdueBooks.forEach((book)=>{
        const diff= Math.ceil((currentDate-book.dueDate)/(1000*60*60*24))
        
        if(diff>7){
            const days= diff-7;
            const finr= days*50;
            totalfine+=fine;
        }
        overDueBook.push({
            title: book.title,
            days:days,
            fine:fine
        })
    })
}
    return {totalfine,overDueBook}
}

const overDue = async (req,res)=>{
    try{
   
        const member_id= await Member.findById(req.query.member_id);
        const book= await Books.findById(req.query.book_id)
        const result = await Result.find({book_id:book.BookID,member_id:member_id.MemberID});
        for(let i=0;i<result.length;i++){
            const {totalfine,overDueBook}=await calculateFIne(result[i].date);
            res.status(200).json({
                totalfine,overDueBook
            })
            
        }
   
   }
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}

const eventt = async (req,res)=>{
    try{
        const book= await Books.findById(req.query.book_id)
        const result = await Result.create({book_id:book.BookID,eventtype:req.query.event});
    res.status(200).json({
        result
    })
   }
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}
const booklist = async (req,res)=>{
    try{
        const book= await Books.find()
    res.status(200).json({
        book
    })
   }
      catch(error){
        res.status(500).json({
                        success: false,
                        error: error.message,
                    }); 
      }
}
module.exports = {createBook,createMember,createresult,checkOutBook,overDue,eventt,booklist}


