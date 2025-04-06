import express from "express";
import adminController from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/signup", adminController.signup);
router.post("/login", adminController.login);
router.get("/", adminController.getAllAdmins); 
router.get("/:id", adminController.getAdminById);
router.delete("/:id", adminController.deleteAdminById); 

export default router;
