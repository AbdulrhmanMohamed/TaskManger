import  User from './../model/UserModel.js';

import express from 'express'
import { createUser, deleteUser, getUserById, loginUser, readingAllusers, updateUserInfo } from '../controller/userController.js';

const router=express.Router();

    router.post('/',createUser)
    router.post('/login',loginUser)
    router.get('/reading-all',readingAllusers)
    router.get('/:id',getUserById)
    router.put('/updateUser/:id',updateUserInfo)
    router.delete('/delete/:id',deleteUser)

export default router ;
