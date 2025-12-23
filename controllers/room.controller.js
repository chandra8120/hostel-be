import Room from '../models/room.model.js'

// Create a new Room
const createRoom = async (req, res) => {
    try {
      const { roomNo, floor, beds, sharing, amount, status, facilities } = req.body;
  
      const existingRoom = await Room.findOne({ roomNo });
      if (existingRoom) {
        return res.status(400).json({ message: 'Room number already exists' });
      }
  
      const newRoom = new Room({
        adminId: req.user._id, 
        roomNo,
        floor,
        beds,
        sharing,
        amount,
        status,
        facilities,
      });
  
      await newRoom.save();
      res.status(201).json({ message: 'Room added successfully', data: newRoom });
    } catch (error) {
      res.status(500).json({ message: 'Error creating room', error: error.message });
    }
  };
  
//  Get all Rooms
 const getAllRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        if(!rooms.length){
          return res.status(404).json({message:"No data found !!"})
        }
        res.status(200).json(rooms);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rooms", error: error.message });
    }
};

//  Get a Room by ID
 const getRoomById = async (req, res) => {
    try {
        const { id } = req.params;
        const room = await Room.findById(id);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: "Error fetching room", error: error.message });
    }
};

//  Update a Room
 const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRoom = await Room.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!updatedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room updated successfully", data: updatedRoom });
    } catch (error) {
        res.status(500).json({ message: "Error updating room", error: error.message });
    }
};

//  Delete a Room
 const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRoom = await Room.findByIdAndDelete(id);

        if (!deletedRoom) {
            return res.status(404).json({ message: "Room not found" });
        }

        res.status(200).json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting room", error: error.message });
    }
};

const getRoomsByStatus = async (req, res) => {
    try {
      const { status } = req.params;
  
      if (!["available", "occupied"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
      }
  
      const rooms = await Room.find({ status });
      res.status(200).json(rooms);
    } catch (error) {
      console.error("Error fetching rooms by status:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

export default {
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom,
    updateRoom,
    getRoomsByStatus
}