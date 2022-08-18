import express from 'express'
import { createTask, getAllTasks, getTaskById, updateTaskInfo } from '../controller/taskController.js';

const router =express.Router();

router.post('/',createTask)
router.get('/',getAllTasks)
router.get('/:id',getTaskById)
router.put('/updateTask/:id',updateTaskInfo)
export default router;