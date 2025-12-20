import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import "./history.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHotel, faHouse, faMapLocationDot, faPerson } from "@fortawesome/free-solid-svg-icons";

const History = () => {
  const { data, loading } = useFetch("/backend/reservations/my");

  return (
    <>
      <Navbar />
      <div className="historyContainer">
        <h2>My Booking History</h2>

        {loading ? (
          "Loading..."
        ) : data.length === 0 ? (
          <p>No reservations found</p>
        ) : (
          data.map((r) => (
            <div className="historyCard" key={r._id}>
              <h3>{r.hotelId.name}</h3>
              <p><FontAwesomeIcon icon={faMapLocationDot}/> {r.hotelId.city}</p>
              <p><FontAwesomeIcon icon={faHotel}/> Room: {r.roomId.title}</p>
              <p><FontAwesomeIcon icon={faHouse}/> Room No: {r.roomNumber}</p>
              <p>
              <FontAwesomeIcon icon={faCalendarDays}/> {new Date(r.startDate).toDateString()} –{" "}
                {new Date(r.endDate).toDateString()}
              </p>
              <p><FontAwesomeIcon icon={faPerson}/> People: {r.people}</p>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
