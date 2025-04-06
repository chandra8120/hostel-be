import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    roomNo: { type: Number, required: true, unique: true }, // Room number as string
    floor: { type: Number, required: true }, // Floor number
    beds: { type: Number, required: true }, // Total beds in room
    sharing: { type: Number,  required: true }, // Type of sharing
    amount: { type: Number, required: true }, // Rent amount
    status: { type: String, enum: ["available", "occupied"], default: "available" }, // Room availability
    facilities: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
  