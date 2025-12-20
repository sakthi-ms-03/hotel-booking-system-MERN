import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data = [], loading, error } = useFetch(
    `/backend/hotels/room/${hotelId}`
  );

  const { dates, options } = useContext(SearchContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // get all dates between check-in & check-out
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());
    const datesArr = [];

    while (date <= end) {
      datesArr.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return datesArr;
  };

  const alldates =
    dates?.length > 0
      ? getDatesInRange(dates[0].startDate, dates[0].endDate)
      : [];

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  // RESERVE FUNCTION
  const handleClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
  
    try {
      // Block room availability
      await Promise.all(
        selectedRooms.map((roomNumberId) =>
          axios.put(
            `/backend/rooms/availability/${roomNumberId}`,
            { dates: alldates },
            { withCredentials: true }
          )
        )
      );
  
      // SAVE RESERVATION HISTORY
      await Promise.all(
        selectedRooms.map((roomNumberId) =>
          axios.post(
            "/backend/reservations",
            {
              hotelId,
              roomId: data[0]._id,
              roomNumber: data
                .flatMap((r) => r.roomNumbers)
                .find((rn) => rn._id === roomNumberId).number,
              startDate: dates[0].startDate,
              endDate: dates[0].endDate,
              people: options.adult + options.children,
            },
            { withCredentials: true }
          )
        )
      );
  
      alert("Room reserved successfully!");
      setOpen(false);
      navigate("/history");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Reservation failed");
    }
  };
  

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>Select your rooms:</span>

        {loading && <p>Loading...</p>}
        {error && <p>Error loading rooms</p>}

        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">₹{item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={handleClick}
          className="rButton"
          disabled={selectedRooms.length === 0}
        >
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
