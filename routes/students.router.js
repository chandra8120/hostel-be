import express from 'express'
import studentsController from '../controllers/students.controller.js'
import auth from '../controllers/middleware.js'

const router=express.Router()

router.post("/",auth,studentsController.createStudent)

router.get("/",studentsController.getAllStudents)

router.get("/:id",studentsController.getStudentById)

router.patch("/:id",studentsController.updateStudent)

router.delete("/:id",studentsController.deleteStudent)

export default router