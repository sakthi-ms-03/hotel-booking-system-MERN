import { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import AdminLayout from "../../AdminLayout";
import "./hotels.css";

const Hotels = () => {
  const { data: hotels, reFetch } = useFetch("/backend/hotels");
  const [openHotel, setOpenHotel] = useState(null);
  const [rooms, setRooms] = useState([]);

  const handleView = async (hotelId) => {
    if (openHotel === hotelId) {
      setOpenHotel(null);
      setRooms([]);
      return;
    }

    try {
      const res = await axios.get(`/backend/hotels/room/${hotelId}`, {
        withCredentials: true,
      });
      setRooms(res.data);
      setOpenHotel(hotelId);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`/backend/hotels/${id}`, {
        withCredentials: true,
      });
      reFetch();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="hotelsPage">
        <h2 className="hotelsTitle">Hotels</h2>

        {hotels?.map((hotel) => (
          <div key={hotel._id} className="hotelCard">
            <div className="hotelHeader">
              <h3>{hotel.name}</h3>
              <p>
                {hotel.city} • {hotel.type} • ₹{hotel.cheapestPrice}
              </p>
            </div>

            <div className="hotelActions">
              <button
                className="viewBtn"
                onClick={() => handleView(hotel._id)}
              >
                {openHotel === hotel._id ? "Hide Details" : "View Details"}
              </button>

              <button
                className="deleteBtn"
                onClick={() => handleDelete(hotel._id)}
              >
                Delete
              </button>
            </div>

            {openHotel === hotel._id && (
              <div className="hotelDetails">
                <p><strong>Address:</strong> {hotel.address}</p>

                <h4>Rooms</h4>

                {rooms.length === 0 ? (
                  <p className="noRooms">No rooms available</p>
                ) : (
                  rooms.map((room) => (
                    <div key={room._id} className="roomCard">
                      <p className="roomTitle">{room.title}</p>
                      <p>Price: ₹{room.price}</p>
                      <p>Max People: {room.maxPeople}</p>
                      <p>
                        Room Numbers:{" "}
                        {room.roomNumbers.map((r) => r.number).join(", ")}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Hotels;
