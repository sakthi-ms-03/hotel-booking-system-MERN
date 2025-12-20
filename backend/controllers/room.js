import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { getDatesInRange } from "../utils/dates.js";

export const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid; // 👈 from URL

  try {
    const newRoom = new Room({
      ...req.body,
      hotelId, // 🔥 IMPORTANT FIX
    });

    const savedRoom = await newRoom.save();

    // attach room to hotel
    await Hotel.findByIdAndUpdate(hotelId, {
      $push: { rooms: savedRoom._id },
    });

    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};


export const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
};
export const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.id },
      {
        $push: {
          "roomNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Room status has been updated.");
  } catch (err) {
    next(err);
  }
};

export const updateRoomReservation = async (req, res, next) => {
  try {
    await Room.updateOne(
      { "roomNumbers._id": req.params.roomNumberId },
      {
        $pull: {
          "roomNumbers.$.unavailableDates": {
            $gte: new Date(req.body.startDate),
            $lte: new Date(req.body.endDate),
          },
        },
      }
    );

    res.status(200).json("Reservation removed successfully");
  } catch (err) {
    next(err);
  }
};

export const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getRoom = async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
};
export const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("hotelId", "name");

    res.status(200).json(rooms);
  } catch (err) {
    console.error("ROOM POPULATE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
