import express from "express";
import breakfastController from "../controllers/breakfast.controller.js";

const router = express.Router();

router.post("/", breakfastController.createBreakfast);

router.get("/", breakfastController.getAllBreakfasts);

router.get("/:id", breakfastController.getBreakfastById);


router.patch("/:id", breakfastController.updateBreakfast);

router.delete("/:id", breakfastController.deleteBreakfast);

export default router;
