import mongoose from "mongoose";

const uri = process.env.mongouri
const Dbconnect = async() =>{
    try {
        await mongoose.connect(uri);
        console.log("db connected.");
        
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}

export default Dbconnect;