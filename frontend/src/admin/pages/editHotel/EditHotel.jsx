import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../AdminLayout";
import useFetch from "../../../hooks/useFetch";
import { hotelImages } from "../../../images/hotelImages";
import "./editHotel.css";

const EditHotel = () => {
  const [hotelId, setHotelId] = useState("");
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

  const { data: hotels } = useFetch("/backend/hotels");

  useEffect(() => {
    if (!hotelId) return;

    const fetchHotel = async () => {
      try {
        const res = await axios.get(`/backend/hotels/find/${hotelId}`, {
          withCredentials: true,
        });

        setHotel({
          name: res.data.name || "",
          type: res.data.type || "",
          city: res.data.city || "",
          address: res.data.address || "",
          distance: res.data.distance || "",
          title: res.data.title || "",
          desc: res.data.desc || "",
          cheapestPrice: res.data.cheapestPrice || "",
          rating: res.data.rating ?? "",
          photos: res.data.photos || [],
        });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchHotel();
  }, [hotelId]);

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const toggleImage = (img) => {
    setHotel((prev) => ({
      ...prev,
      photos: prev.photos.includes(img)
        ? prev.photos.filter((i) => i !== img)
        : [...prev.photos, img],
    }));
  };

  const handleUpdate = async () => {
    if (!hotelId) {
      alert("Please select a hotel");
      return;
    }

    try {
      await axios.put(
        `/backend/hotels/${hotelId}`,
        {
          ...hotel,
          cheapestPrice: Number(hotel.cheapestPrice),
          rating: Number(hotel.rating),
        },
        { withCredentials: true }
      );

      alert("Hotel updated successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update failed");
    }
  };

  return (
    <AdminLayout>
      <div className="editHotel">
        <h2 className="editHotelTitle">Edit Hotel</h2>

        <select
          className="editHotelSelect"
          onChange={(e) => setHotelId(e.target.value)}
        >
          <option value="">Select Hotel</option>
          {hotels?.map((h) => (
            <option key={h._id} value={h._id}>
              {h.name}
            </option>
          ))}
        </select>

        {hotelId && (
          <>
            <div className="editHotelForm">
              <input name="name" value={hotel.name} onChange={handleChange} placeholder="Hotel Name" />
              <input name="type" value={hotel.type} onChange={handleChange} placeholder="Type" />
              <input name="city" value={hotel.city} onChange={handleChange} placeholder="City" />
              <input name="address" value={hotel.address} onChange={handleChange} placeholder="Address" />
              <input name="distance" value={hotel.distance} onChange={handleChange} placeholder="Distance" />
              <input name="title" value={hotel.title} onChange={handleChange} placeholder="Title" />
              <input name="desc" value={hotel.desc} onChange={handleChange} placeholder="Description" />
              <input name="cheapestPrice" value={hotel.cheapestPrice} onChange={handleChange} placeholder="Price" />
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={hotel.rating}
                onChange={handleChange}
                placeholder="Rating (0 - 5)"
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
                  onClick={() => toggleImage(img)}
                />
              ))}
            </div>

            <button className="editHotelBtn" onClick={handleUpdate}>
              Update Hotel
            </button>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default EditHotel;
