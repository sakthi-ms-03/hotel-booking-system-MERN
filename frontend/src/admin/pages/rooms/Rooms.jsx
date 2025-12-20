import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import AdminLayout from "../../AdminLayout";
import "./rooms.css";

const Rooms = () => {
  const { data: rooms, reFetch } = useFetch("/backend/rooms");

  const handleRemoveReservation = async (roomNumberId, date) => {
    try {
      await axios.put(
        `/backend/rooms/availability/remove/${roomNumberId}`,
        {
          startDate: date,
          endDate: date,
        },
        { withCredentials: true }
      );

      alert("Reservation removed successfully");
      reFetch();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  return (
    <AdminLayout>
      <div className="roomsPage">
        <h2 className="roomsTitle">Rooms & Reservations</h2>

        {rooms?.map((room) => (
          <div key={room._id} className="roomCard">
            <h3 className="hotelName">
              Hotel:{" "}
              <span>
                {room.hotelId?.name || "Hotel not assigned"}
              </span>
            </h3>

            <p>
              <strong>Room Type:</strong> {room.title}
            </p>
            <p>
              <strong>Price:</strong> ₹{room.price}
            </p>

            {room.roomNumbers.map((rn) => (
              <div key={rn._id} className="roomNumberCard">
                <strong>Room No: {rn.number}</strong>

                {rn.unavailableDates.length === 0 ? (
                  <p className="available">Available</p>
                ) : (
                  rn.unavailableDates.map((date, i) => (
                    <div key={i} className="reservationRow">
                      <span>
                        {new Date(date).toDateString()}
                      </span>
                      <button
                        className="removeBtn"
                        onClick={() =>
                          handleRemoveReservation(rn._id, date)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default Rooms;
