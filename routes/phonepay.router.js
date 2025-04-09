import express from "express";
import multer from 'multer'
import auth from '../controllers/middleware.js'

import phonepayController from "../controllers/phonepay.controller.js";


const router = express.Router();


const storage=multer.memoryStorage()

const upload=multer({storage}).single("image")

router.get('/admin', auth, phonepayController.getPhonepayByLoggedInAdmin);

router.post("/", auth,upload,phonepayController.createPhonepay);

router.get("/", phonepayController.getAllPhonepay);

router.get("/:id", phonepayController.getPhonepayById);

router.patch("/:id", phonepayController.updatePhonepay);

router.delete("/:id",phonepayController.deletePhonepay)



export default router
