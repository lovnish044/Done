const mongoose = require("mongoose");
//mongoDb connection
const connectDatabase = () => {
    try{
  mongoose.connect(process.env.MongoDb_Uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
     
    })
    console.log("Conected to Database SuccessFully")
}catch(error){
    console.log('Error: ', error.message);
}
};

module.exports = connectDatabase;