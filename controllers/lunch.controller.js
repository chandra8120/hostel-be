import Lunch from "../models/Lunch.js";

// ✅ Create Lunch Menu
export const createLunch = async (req, res) => {
    try {
        const lunch = new Lunch(req.body);
        await lunch.save();
        res.status(201).json({ success: true, message: "Lunch menu added successfully", data: lunch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Lunch Menu
export const getLunch = async (req, res) => {
    try {
        const lunch = await Lunch.find();
        res.status(200).json({ success: true, data: lunch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Lunch Menu
export const updateLunch = async (req, res) => {
    try {
        const updatedLunch = await Lunch.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLunch) {
            return res.status(404).json({ success: false, message: "Lunch menu not found" });
        }
        res.status(200).json({ success: true, message: "Lunch menu updated", data: updatedLunch });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Lunch Menu
export const deleteLunch = async (req, res) => {
    try {
        const deletedLunch = await Lunch.findByIdAndDelete(req.params.id);
        if (!deletedLunch) {
            return res.status(404).json({ success: false, message: "Lunch menu not found" });
        }
        res.status(200).json({ success: true, message: "Lunch menu deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
