import "./propertyList.css";
import useFetch from "../../hooks/useFetch.js";
import { propertyImages } from "../../images/propertyImages.js";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/backend/hotels/countByType");

  return (
    <div className="pList">
      {loading ? (
        "loading"
      ) : (
        <>
          {data && propertyImages.map((img,i)=> (
              <div className="pListItem" key={i}>
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[i]?.type}</h1>
                  <h2>
                    {data[i]?.count} {data[i]?.type}
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
