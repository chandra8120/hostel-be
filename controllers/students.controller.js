import Room from "../models/room.model.js";
import Student from "../models/students.model.js"

// ✅ Add a new student
const createStudent = async (req, res) => {
    try {
        const { name, address, adharCard, photo, payType, totalAmount, roomId, dateOfJoining } = req.body;

        // Check if the room exists
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        // Count current students in the room
        const studentCount = await Student.countDocuments({ roomId });

        // Check if the room is full
        if (studentCount >= room.sharing) {
            return res.status(400).json({ message: "Room is full, cannot add more students" });
        }

        // Create new student
        const newStudent = new Student({
            adminId: req.user._id, 
            name,
            address,
            adharCard,
            photo,
            payType,
            totalAmount,
            roomId,
            dateOfJoining
        });

        await newStudent.save();

        // Update room status to "occupied" if it's now full
        if (studentCount + 1 === room.sharing) {
            await Room.findByIdAndUpdate(roomId, { status: "occupied" });
        }

        res.status(201).json({ message: "Student added successfully", data: newStudent });

    } catch (error) {
        res.status(500).json({ message: "Error adding student", error: error.message });
    }
};

//  Get all Students
 const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("roomId", "roomNo floor sharing"); // Populate room details
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};

//  Get a Student by ID
 const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findById(id).populate("roomId", "roomNo floor sharing");

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: "Error fetching student", error: error.message });
    }
};

// Update a Student
 const updateStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student updated successfully", data: updatedStudent });
    } catch (error) {
        res.status(500).json({ message: "Error updating student", error: error.message });
    }
};

//  Delete a Student
 const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
};

export default {
    createStudent,
    getAllStudents,
    deleteStudent,
    updateStudent,
    getStudentById,
}