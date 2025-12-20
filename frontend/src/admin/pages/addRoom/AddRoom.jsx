import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../AdminLayout";
import useFetch from "../../../hooks/useFetch";
import "./addRoom.css";

const AddRoom = () => {
  const [hotelId, setHotelId] = useState("");
  const [room, setRoom] = useState({
    title: "",
    price: "",
    maxPeople: "",
    desc: "",
    roomNumbers: "",
  });

  const { data: hotels, loading } = useFetch("/backend/hotels");

  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!hotelId) {
      alert("Please select a hotel");
      return;
    }

    const roomData = {
      title: room.title,
      price: Number(room.price),
      maxPeople: Number(room.maxPeople),
      desc: room.desc,
      roomNumbers: room.roomNumbers.split(",").map((num) => ({
        number: Number(num.trim()),
      })),
    };

    try {
      await axios.post(`/backend/rooms/${hotelId}`, roomData, {
        withCredentials: true,
      });

      alert("Room added successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error creating room");
    }
  };

  return (
    <AdminLayout>
      <div className="addRoom">
        <h2 className="addRoomTitle">Add New Room</h2>

        <div className="addRoomForm">
          {loading ? (
            <p>Loading hotels...</p>
          ) : (
            <select
              className="addRoomSelect"
              onChange={(e) => setHotelId(e.target.value)}
            >
              <option value="">Select Hotel</option>
              {hotels?.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          )}

          <input
            name="title"
            placeholder="Room Title"
            onChange={handleChange}
          />

          <input
            name="price"
            placeholder="Price"
            onChange={handleChange}
          />

          <input
            name="maxPeople"
            placeholder="Max People"
            onChange={handleChange}
          />

          <input
            name="desc"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            name="roomNumbers"
            placeholder="Room Numbers (101,102)"
            onChange={handleChange}
          />
        </div>

        <button className="addRoomBtn" onClick={handleSubmit}>
          Add Room
        </button>
      </div>
    </AdminLayout>
  );
};

export default AddRoom;
