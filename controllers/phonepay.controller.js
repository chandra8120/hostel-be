import Phonepay from '../models/phonepay.model.js'

 const createPhonepay = async (req, res) => {
  try {
    const {phone, name, description } = req.body;

    if (!req.file) {
        return res.status(400).json({ message: "Image field is missing!" });
    }
    const image = req.file.buffer.toString("base64");

    const newEntry = new Phonepay({adminId:req.user._id, image, phone, name, description });
    await newEntry.save();

    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: "Failed to create entry", error: err.message });
  }
};

// Get all phonepay entries
 const getAllPhonepay = async (req, res) => {
  try {
    const entries = await Phonepay.find();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch entries", error: err.message });
  }
};

// Get a single phonepay entry by ID
 const getPhonepayById = async (req, res) => {
  try {
    const entry = await Phonepay.findById(req.params.id);
    if (!entry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (err) {
    res.status(500).json({ message: "Error fetching entry", error: err.message });
  }
};

// Update a phonepay entry
 const updatePhonepay = async (req, res) => {
  try {
    const updated = await Phonepay.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
};

// Delete a phonepay entry
 const deletePhonepay = async (req, res) => {
  try {
    const deleted = await Phonepay.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
};

const getPhonepayByLoggedInAdmin = async (req, res) => {
  try {
    const adminId = req.user?._id;
    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized: Admin ID not found" });
    }

    const phonepays = await Phonepay.find({ adminId })

    res.status(200).json(phonepays);
  } catch (error) {
    console.error("Error fetching entries by logged-in admin:", error);
    res.status(500).json({ message: "Error fetching entry", error: error.message });
  }
};

  
  

export default {
    createPhonepay,
    getAllPhonepay,
    deletePhonepay,
    updatePhonepay,
    getPhonepayById,
    getPhonepayByLoggedInAdmin
}