import mongoose from "mongoose";

const connection=async()=>{
    try{
         mongoose.connect(process.env.MONGO_URL,()=>{
            console.log('connected succesfuly'.bgGreen)
        })
    }catch(e){
        console.log('error',e)
    }
}

export default connection;
