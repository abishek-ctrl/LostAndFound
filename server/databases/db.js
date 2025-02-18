const mongoose= require('mongoose');

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error: ",err);
        process.exit(1);
    }
}

module.exports=connectDB;