import express from "express";
import roomsController from "../controllers/room.controller.js";
import auth from '../controllers/middleware.js'
const router = express.Router();

router.post("/", auth,roomsController.createRoom);
router.get("/", roomsController.getAllRooms);
router.get("/:id", roomsController.getRoomById);
router.patch("/:id", roomsController.updateRoom);
router.delete("/:id", roomsController.deleteRoom);

export default router;
