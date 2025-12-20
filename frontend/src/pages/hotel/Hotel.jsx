import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./hotel.css";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { useState, useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import { roomImages } from "../../images/roomImages";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [slideNumber, setSlideNumber] = useState(0);
  const [openSlider, setOpenSlider] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading } = useFetch(`/backend/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const navigate = useNavigate();

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const dayDifference = (date1, date2) =>
    Math.ceil(Math.abs(date2 - date1) / MILLISECONDS_PER_DAY);

  const defaultDates = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ];
  const safeDates = dates?.length ? dates : defaultDates;
  const days = dayDifference(safeDates[0].endDate, safeDates[0].startDate);

  // Open Slider
  const handleOpen = (index) => {
    setSlideNumber(index);
    setOpenSlider(true);
  };

  // Slide Left / Right
  const handleMove = (direction) => {
    let newSlide;
    if (direction === "l") {
      newSlide = slideNumber === 0 ? roomImages.length - 1 : slideNumber - 1;
    } else {
      newSlide = slideNumber === roomImages.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlide);
  };

  // Reserve or Login
  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />

      {loading ? (
        <p style={{ textAlign: "center", marginTop: "50px" }}>Loading...</p>
      ) : (
        <div className="hotelContainer">
          {/* Image Slider */}
          {openSlider && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpenSlider(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={roomImages[slideNumber]}
                  alt={`room-${slideNumber}`}
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )}

          {/* Hotel Info */}
          <div className="hotelWrapper">
            <h1 className="hotelName">{data.name}</h1>

            <div className="hotelAddress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.address}</span>
            </div>

            <div className="hotelDistance">
              Excellent location – {data.distance}m from center
            </div>

            <div className="hotelPriceHighlight">
              Book a stay over ₹{data.cheapestPrice} and get a free airport
              taxi
            </div>

            {/* Room Images */}
            <div className="hotelImages">
              {roomImages.map((img, index) => (
                <div className="hotelImgWrapper" key={index}>
                  <img
                    src={img}
                    alt={`room-${index}`}
                    className="hotelImg"
                    onClick={() => handleOpen(index)}
                  />
                </div>
              ))}
            </div>

            {/* Hotel Details */}
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h2>{data.title}</h2>
                <p>{data.desc}</p>
              </div>

              <div className="hotelDetailsPrice">
                <h3>Perfect for a {days}-night stay!</h3>
                <span>
                  Located in the real heart of the city with excellent location
                  score!
                </span>
                <h2>
                  <b>₹{days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <MailList />
      <Footer />

      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;
