import mongoose from "mongoose";

const connectDB = async ()=>{  
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Successfully connected to mongo DB`);
    }
    catch(err){
        console.error(`ERROR ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;