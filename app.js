const dotenv = require("dotenv")
const express = require("express")
const cors = require("cors")
const connectDatabase = require("./config/database")
const bodyParser = require("body-parser");

const app=express()
app.use(express.json()); //for json
dotenv.config({path:"./config/config.env"})// env file
app.use(bodyParser.urlencoded({ extended: true }));// fo middleware
app.use(cors())// to handle cors error

connectDatabase();
const User = require("./router/Book")
app.use("/api/v1" ,User)
const PORT=process.env.PORT || 5000 //change port number is per project requirment 


app.listen(PORT, () => console.log(`Server is running successfully on http://localhost:${PORT}`));