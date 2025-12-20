import { useState } from "react";
import axios from "axios";
import AdminLayout from "../../AdminLayout";
import { hotelImages } from "../../../images/hotelImages";
import "./addHotel.css";

const AddHotel = () => {
  const [hotel, setHotel] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    title: "",
    desc: "",
    cheapestPrice: "",
    rating: "",
    photos: [],
  });

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (img) => {
    setHotel((prev) => ({
      ...prev,
      photos: prev.photos.includes(img)
        ? prev.photos.filter((i) => i !== img)
        : [...prev.photos, img],
    }));
  };

  const handleSubmit = async () => {
    try {
      const hotelData = {
        ...hotel,
        cheapestPrice: Number(hotel.cheapestPrice),
        rating: Number(hotel.rating),
      };

      await axios.post("/backend/hotels", hotelData, {
        withCredentials: true,
      });

      alert("Hotel added successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to add hotel");
    }
  };

  return (
    <AdminLayout>
      <div className="addHotel">
        <h2 className="addHotelTitle">Add New Hotel</h2>

        <div className="addHotelForm">
          <input name="name" placeholder="Hotel Name" onChange={handleChange} />
          <input name="city" placeholder="City" onChange={handleChange} />
          <input name="type" placeholder="Type" onChange={handleChange} />
          <input name="address" placeholder="Address" onChange={handleChange} />
          <input name="distance" placeholder="Distance" onChange={handleChange} />
          <input name="title" placeholder="Title" onChange={handleChange} />
          <input name="desc" placeholder="Description" onChange={handleChange} />
          <input name="cheapestPrice" placeholder="Price" onChange={handleChange} />

          <input
            name="rating"
            placeholder="Rating (0 - 5)"
            type="number"
            min="0"
            max="5"
            step="0.1"
            onChange={handleChange}
          />
        </div>

        <h3 className="imageTitle">Select Hotel Images</h3>

        <div className="imageGrid">
          {hotelImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="hotel"
              className={`hotelImg ${
                hotel.photos.includes(img) ? "selected" : ""
              }`}
              onClick={() => handleImageSelect(img)}
            />
          ))}
        </div>

        <button className="addHotelBtn" onClick={handleSubmit}>
          Add Hotel
        </button>
      </div>
    </AdminLayout>
  );
};

export default AddHotel;
