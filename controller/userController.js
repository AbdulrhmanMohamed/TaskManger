import User from "../model/UserModel.js";
import bcrypt from 'bcryptjs'
export const createUser = async (req, res) => {
    // check if user exist first 
    try {
        const userExist = await User.findOne({ email: req.body.email })
        console.log('userExist', userExist)
        if (userExist) {
            res.status(200).send({ success: false, errMessage: 'user Alreay Exist' })
        }
        else {
            const user = new User({...req.body,password:bcrypt.hashSync(req.body.password,10)})


            await user.save();

            res.status(200).send({ success: true, res: user })

        }

    }
    catch (e) {
        res.status(500).json(e)
    }

}

export const readingAllusers = async (req, res) => {
    User.find().then(users => {
        if (users.length > 0) {
            return res.status(200).send({ success: true, res: users })
        }
        else {
            res.status(200).send({ success: false, errMessage: 'No users Found' })
        }
    }).catch(e => res.status(500).send(e))
}

export const getUserById = async (req, res) => {
    const id = req.params.id;
    User.findById(id).then(user => res.status(200).send({ success: true, res: user })).catch(e=>res.status(500).send(e))
}

export const updateUserInfo=async(req,res)=>{
    console.log('reqBody',req.body)
    const id=req.params.id;
    User.findByIdAndUpdate(id,req.body,{returnOriginal:false}).then(user =>{
        if(!user){
            res.send({success:false,errMessage:'User not Found'})
        }
        else{
            res.send({success:true,res:user})
        }
    })
}

export const deleteUser=async(req,res)=>{

    const id=req.params.id;
    console.log(id)
    
    User.findByIdAndDelete(id).then(user => res.status(200).send({success:true,message:'User Deleted Successfuly',res:user})).catch(e=>res.status(500).send({message:e.message}))

}

export const loginUser=async(req,res)=>{
    try{
        // custom credential function on userModel
        const user=await User.findByCredentials(req.body.email,req.body.password)

        if(user){
         res.status(200).send({success:true,res:user})
        }
    }catch(e){
        res.status(400).send("Invalid Email or Password")
    }
  
  
}