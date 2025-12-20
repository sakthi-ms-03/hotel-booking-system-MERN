import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  maxPeople: { type: Number, required: true },
  desc: { type: String },
  roomNumbers: [
    {
      number: Number,
      unavailableDates: { type: [Date] },
    },
  ],
  hotelId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
    required: true,
  },
});

export default mongoose.model("Room", RoomSchema);
