import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Full name of the person contacting
    email: { type: String, required: true }, // Email address
    phone: { type: String, required: true }, // Phone number
    message: { type: String, required: true }, // Message conten
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
