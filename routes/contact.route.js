import express from 'express'
import contactController from '../controllers/contact.controller.js'

const router=express.Router()

router.post("/",contactController.createContact)

router.get("/",contactController.getAllContact)

router.patch("/:id",contactController.updateContact)

router.delete("/:id",contactController.deleteContact)

export default router