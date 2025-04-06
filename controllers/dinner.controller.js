import Dinner from "../models/Dinner.js";

// ✅ Create Dinner Menu
export const createDinner = async (req, res) => {
    try {
        const dinner = new Dinner(req.body);
        await dinner.save();
        res.status(201).json({ success: true, message: "Dinner menu added successfully", data: dinner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Dinner Menu
export const getDinner = async (req, res) => {
    try {
        const dinner = await Dinner.find();
        res.status(200).json({ success: true, data: dinner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Dinner Menu
export const updateDinner = async (req, res) => {
    try {
        const updatedDinner = await Dinner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDinner) {
            return res.status(404).json({ success: false, message: "Dinner menu not found" });
        }
        res.status(200).json({ success: true, message: "Dinner menu updated", data: updatedDinner });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Dinner Menu
export const deleteDinner = async (req, res) => {
    try {
        const deletedDinner = await Dinner.findByIdAndDelete(req.params.id);
        if (!deletedDinner) {
            return res.status(404).json({ success: false, message: "Dinner menu not found" });
        }
        res.status(200).json({ success: true, message: "Dinner menu deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
