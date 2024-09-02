import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SpotById.css";

function Spots() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getSpotDetails(spotId));
  }, [dispatch, spotId]);

  const spot = Object.values(useSelector((state) => state.spots)).find(
    (spt) => spt.id === Number(spotId)
  );
  const {
    name,
    city,
    state,
    country,
    description,
    previewImage,
    price,
    avgStarRating,
    numReviews,
  } = spot;
  const { firstName, lastName } = spot.Owner || {
    firstName: null,
    lastName: null,
  };
  const spotImages = spot.SpotImages;

  return (
    <div className="spot-details">
      <div className="spot-details-content">
        <div className="top-details">
          <h2 className="bluetext">{name}</h2>
          <p>Location: {`${city}, ${state}, ${country}`}</p>
        </div>
        <div className="spot-details-images">
          <img src={previewImage} className="preview-image"></img>
          {spotImages ? (
            <div className="non-preview-images">
              {spotImages.map((img) =>
                !img.preview ? <img key={img.id} src={img.url} /> : null
              )}
            </div>
          ) : null}
        </div>
        <div className="details-details">
          <div className="description">
            <p className="hosted-by bluetext">
              Hosted by: {`${lastName}, ${firstName}`}
            </p>
            <p>{description}</p>
          </div>
          <div className="reserve-area">
            <div className="price-per-night">
              <p>{`$${price}`}</p>
              <p id="night">night</p>
            </div>
            <p>
              ★{" "}
              {numReviews
                ? `${avgStarRating.toFixed(1)} · ${numReviews} review${
                    numReviews !== 1 ? "s" : ""
                  }`
                : "New"}
            </p>

            <button
              className="reserve-button"
              onClick={() => alert("Feature Coming Soon...")}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Spots;
