import Breakfast from '../models/breakfast.model.js'

// Create a new Breakfast entry
const createBreakfast = async (req, res) => {
    try {
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

        if (!monday || !tuesday || !wednesday || !thursday || !friday || !saturday || !sunday) {
            return res.status(400).json({ message: "All days are required" });
        }

        const newBreakfast = new Breakfast({
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday
        });

        await newBreakfast.save();
        res.status(201).json({ message: "Breakfast menu added successfully", data: newBreakfast });
    } catch (error) {
        res.status(500).json({ message: "Error creating breakfast menu", error: error.message });
    }
};

// Get all Breakfast entries
const getAllBreakfasts = async (req, res) => {
    try {
        const breakfasts = await Breakfast.find();
        res.status(200).json(breakfasts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching breakfasts", error: error.message });
    }
};

// Get a Breakfast entry by ID
const getBreakfastById = async (req, res) => {
    try {
        const { id } = req.params;
        const breakfast = await Breakfast.findById(id);

        if (!breakfast) {
            return res.status(404).json({ message: "Breakfast entry not found" });
        }

        res.status(200).json(breakfast);
    } catch (error) {
        res.status(500).json({ message: "Error fetching breakfast", error: error.message });
    }
};

// Update a Breakfast entry
const updateBreakfast = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBreakfast = await Breakfast.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedBreakfast) {
            return res.status(404).json({ message: "Breakfast entry not found" });
        }

        res.status(200).json({ message: "Breakfast updated successfully", data: updatedBreakfast });
    } catch (error) {
        res.status(500).json({ message: "Error updating breakfast", error: error.message });
    }
};

// Delete a Breakfast entry
const deleteBreakfast = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBreakfast = await Breakfast.findByIdAndDelete(id);

        if (!deletedBreakfast) {
            return res.status(404).json({ message: "Breakfast entry not found" });
        }

        res.status(200).json({ message: "Breakfast deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting breakfast", error: error.message });
    }
};

export default {
    createBreakfast,
    getAllBreakfasts,
    getBreakfastById,
    updateBreakfast,
    deleteBreakfast
};
