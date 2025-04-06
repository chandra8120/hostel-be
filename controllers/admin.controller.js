import Admin from "../models/admin.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'

dotenv.config()

const signup = async (req, res) => {
    try {
        const { name, phone, password } = req.body;

        const existingAdmin = await Admin.findOne({ phone });
        if (existingAdmin) {
            return res.status(400).json({ message: "Phone number already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);


        const newAdmin = new Admin({ name, phone, password: hashedPassword });
        await newAdmin.save();


        res.status(201).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: "Signup failed", error: error.message });
    }
};

// Login
const login = async (req, res) => {
    try {
        const { phone, password } = req.body;

        // Check if admin exists
        const admin = await Admin.findOne({ phone });
        if (!admin) {
            return res.status(400).json({ message: "Invalid phone number or password" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid phone number or password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: admin._id, phone: admin.phone }, // Payload
            process.env.JWT_SECRET, // Secret key
            { expiresIn: "7d" } // Token expiration
        );

        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Login failed", error: error.message });
    }
};

// Get admin by ID
const getAdminById = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id).select("-password"); // Exclude password from response
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admin", error: error.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select("-password"); // Exclude passwords
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: "Error fetching admins", error: error.message });
    }
};

// Delete admin by ID
const deleteAdminById = async (req, res) => {
    try {
        const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        res.status(200).json({ message: "Admin deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting admin", error: error.message });
    }
};

export default { signup, login, getAdminById, getAllAdmins, deleteAdminById };
