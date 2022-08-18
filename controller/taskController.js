import Task from "../model/TaskModel.js"

export const createTask=async(req,res)=>{
    // i'm not sure if i should check to see the task is been created before or not 
    try{
        const existedTask=await Task.findOne({description:req.body.description})
        if(existedTask){
            res.status(200).send({success:false,errMessage:'Task Already Exist'})
        }
        else{
            const newTask=new Task(req.body)
            await newTask.save();
            res.status(200).send({success:true,res:newTask})
        }

    }catch(e){
        res.status(500).send(e)
    }
}

export const getAllTasks=async(req,res)=>{

    Task.find().then(tasks => {
        if(tasks.length >0){
           return  res.status(200).send({sucess:true,res:tasks})
        }
        else{
            res.status(200).send({success:false,errMessage:'Tasks Not Found'})
        }
    }).catch(e => res.status(500).send(e))
}


export const getTaskById=async(req,res)=>{
    const id=req.params.id;
    Task.findById(id).then(task => res.status(200).send({success:true,res:task})).catch(e =>res.status(500).send(e))

}

export const updateTaskInfo=async(req,res)=>{
    console.log('reqBody',req.body)
    const id=req.params.id;
    Task.findByIdAndUpdate(id,req.body,{returnOriginal:false}).then(task =>{
        if(!task){
            res.send({success:false,errMessage:'task not Found'})
        }
        else{
            res.send({success:true,res:task})
        }
    })
}