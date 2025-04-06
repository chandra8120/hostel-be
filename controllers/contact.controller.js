import Contact from '../models/contact.model.js'

//  Create a Contact Inquiry
const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;


        const existingUser=await Contact.findOne({email})

        if(existingUser){
            return res.status(400).json({message:"user already exist!"})
        }

        // Basic validation
        if (!name || !email || !phone || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const contact = new Contact({ name, email, phone, message });
        await contact.save();

        res.status(201).json({ success: true, message: "contact submitted successfully", data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Get All Inquiries
 const getAllContact = async (req, res) => {
    try {
        const inquiries = await Contact.find();
        res.status(200).json({ success: true, data: inquiries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Get Inquiry by ID
 const getContactById = async (req, res) => {
    try {
        const inquiry = await Contact.findById(req.params.id);
        if (!inquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }
        res.status(200).json({ success: true, data: inquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Update Inquiry Status
 const updateContact = async (req, res) => {
    try {
        const updatedInquiry = await Contact.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }
        res.status(200).json({ success: true, message: "Inquiry status updated", data: updatedInquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//  Delete an Inquiry
 const deleteContact = async (req, res) => {
    try {
        const deletedInquiry = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedInquiry) {
            return res.status(404).json({ success: false, message: "Inquiry not found" });
        }
        res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export default {createContact,getAllContact,getContactById,deleteContact,updateContact}