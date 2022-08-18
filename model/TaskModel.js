import mongoose from "mongoose";
const TaskSchema=mongoose.Schema({
    description:{
        type:String,
        required:true,
        trim:true,
    },
    completed:{
        type:Boolean,
        default:false,
    }
})

const Task=mongoose.model('Task',TaskSchema)
export default Task;