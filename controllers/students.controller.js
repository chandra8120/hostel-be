import Room from "../models/room.model.js";
import Student from "../models/students.model.js"

// const createStudent = async (req, res) => {
//     try {
//         const { name, address, adharCard, photo, payType, totalAmount, dateOfJoining, roomId } = req.body;

//         // Find the room using roomId
//         const room = await Room.findById(roomId); 
//         if (!room) {
//             return res.status(404).json({ message: "Room not found" });
//         }

//         // Count how many students are already in this room
//         const studentCount = await Student.countDocuments({ roomId });

//         // Check if room is already full based on sharing (bed count)
//         if (studentCount >= room.beds) {
//             return res.status(400).json({ message: `Room No ${room.roomNo} is already full.` });
//         }

//         // Create the student
//         const newStudent = new Student({
//             adminId: req.user._id,
//             name,
//             address,
//             adharCard,
//             photo,
//             payType,
//             totalAmount,
//             roomId,
//             dateOfJoining
//         });

//         await newStudent.save();

//         res.status(201).json({ message: "Student added successfully", data: newStudent });

//     } catch (error) {
//         res.status(500).json({ message: "Error adding student", error: error.message });
//     }
// };

const createStudent = async (req, res) => {
    try {
      const {
        name,
        address,
        adharCard,
        photo,
        phone,
        paidAmount,
        dueAmount,
        payType,
        totalAmount,
        dateOfJoining,
        roomId
      } = req.body;
  
      // Room ni find cheyyadam
      const room = await Room.findById(roomId);
      if (!room) {
        return res.status(404).json({ message: "Room not found" });
      }
  
      // Ee room lo unna student count
      const studentCount = await Student.countDocuments({ roomId });
  
      // Room full ayithe, status ni update cheyyali, student create cheyyakunda
      if (studentCount >= room.beds) {
        if (room.status !== "occupied") {
          room.status = "occupied";
          await room.save();
        }
        return res.status(400).json({ message: `Room No ${room.roomNo} is already full.` });
      }
  
      // Student create cheyyadam
      const newStudent = new Student({
        adminId: req.user._id,
        name,
        address,
        adharCard,
        phone,
        paidAmount,
        dueAmount,
        photo,
        payType,
        totalAmount,
        roomId,
        dateOfJoining
      });
  
      await newStudent.save();
  
      // Student add ayyina tarvata malli check cheyyali
      const updatedCount = await Student.countDocuments({ roomId });
      if (updatedCount === room.beds && room.status !== "occupied") {
        room.status = "occupied";
        await room.save();
      }
  
      res.status(201).json({ message: "Student added successfully", data: newStudent });
  
    } catch (error) {
      res.status(500).json({ message: "Error adding student", error: error.message });
    }
  };
  
  

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