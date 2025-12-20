import "./featured.css";
import useFetch from "../../hooks/useFetch.js";
import { placeImages } from "../../images/placeImages.js";

const Featured = () => {

  const { data, loading, error } = useFetch(
    "/backend/hotels/countByCity?cities=goa,ooty,ladakh"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <><div className="featuredItem">
        <img src={placeImages[0]} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Goa</h1>
          <h2>{data[0]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={placeImages[1]} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ooty</h1>
          <h2>{data[1]} properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src={placeImages[2]} alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Ladakh</h1>
          <h2>{data[2]} properties</h2>
        </div>
      </div>
      </>)}
    </div>
  );
};

export default Featured;
