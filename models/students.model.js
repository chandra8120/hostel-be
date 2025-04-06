import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
     adminId: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
    name: { type: String, required: true }, 
    address: { type: String, required: true }, 
    adharCard: { type: String, required: true, unique: true }, 
    photo: { type: String, required: true }, 
    payType: { type: String, enum: ["online", "cash"], required: true }, 
    totalAmount: { type: Number, required: true }, 
    pendingAmount: { type: Number, default: 0 }, 
    dueAmount: { type: Number, default: 0 }, 
    dateOfJoining: { type: Date, required: true }, 
    vacate: { type: Boolean, default: false }, 
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true }, 
}, { timestamps: true });

export default mongoose.model("Students", studentSchema);
