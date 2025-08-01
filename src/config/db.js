const mongoose = require("mongoose");

const dbConnect = ()=>{
    
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Database connected successfully!");
    })
    .catch(()=>{
        console.log("MongoDb connection error!!!!!");
        
    })
}

module.exports = dbConnect;