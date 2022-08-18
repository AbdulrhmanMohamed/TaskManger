import express from 'express'
import dotenv from 'dotenv'
import connection from './connect.js';
import colors from 'colors'
import UsersRoutes from './routes/userRoutes.js'
import TaskRoutes from './routes/taskRoutes.js'
const app=express();
dotenv.config();
const port =process.env.PORT || 5000;

app.listen(port,()=>{
    console.log('started successfuly'.green)
})
connection();


// creating parsing the json in express 
app.use(express.json())

// creating Routes 
app.use('/users',UsersRoutes)
app.use('/tasks',TaskRoutes)






