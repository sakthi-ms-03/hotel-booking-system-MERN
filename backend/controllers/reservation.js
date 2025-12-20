import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res, next) => {
  try {
    const newReservation = new Reservation({
      userId: req.user.id,
      hotelId: req.body.hotelId,
      roomId: req.body.roomId,
      roomNumber: req.body.roomNumber,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      people: req.body.people,
    });

    await newReservation.save();
    res.status(200).json("Reservation saved");
  } catch (err) {
    next(err);
  }
};
export const getUserReservations = async (req, res, next) => {
    try {
      const reservations = await Reservation.find({
        userId: req.user.id,
      })
        .populate("hotelId", "name city")
        .populate("roomId", "title");
  
      res.status(200).json(reservations);
    } catch (err) {
      next(err);
    }
  };
  export const getReservationsByUserId = async (req, res, next) => {
    try {
      const reservations = await Reservation.find({
        userId: req.params.userId,
      })
        .populate("hotelId", "name city")
        .populate("roomId", "title");
  
      res.status(200).json(reservations);
    } catch (err) {
      next(err);
    }
  };
  