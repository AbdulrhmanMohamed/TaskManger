import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        toLowerCase:true,
        unique:true,
        validate(value){

           if( !validator.isEmail(value)){
            throw new Error('Email is Not Valid')
           }
        },
        
    },
    password:{
        type:String,
        required:true,
        min:7,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error('invalid password pattern')
            }
        }
    }
},{timestamps:true})

userSchema.statics.findByCredentials=async(email,password)=>{
   

        const user=await User.findOne({email})
        // console.log('fondUser',user)
        if(!user){
           
            throw new Error('Invalid Email')
        }else{
            console.log('calling Else ',password)
            const isMatched= bcrypt.compareSync(password,user.password)
            if(isMatched){
              
                return user;
            }
            else{
                throw new Error('password Doesnt Match')
            }
        }
   

}
const User=mongoose.model('User',userSchema)
export default User;

