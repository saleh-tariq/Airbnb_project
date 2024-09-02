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

  const spot = useSelector((state) => state.spots)[spotId];
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
      <div className="top-details">
        <h2>{name}</h2>
        <p>Location: {`${city}, ${state}, ${country}`}</p>
      </div>
      <div>
        <img src={previewImage}></img>
        <div className="non-preview-images">
          {spotImages ? (
            <ul>
              {spotImages.map((img) =>
                !img.preview ? (
                  <li key={img.id}>
                    <img src={img.url} />
                  </li>
                ) : null
              )}
            </ul>
          ) : null}
        </div>
      </div>
      <div className="details-details">
        <div className="description">
          <p>Hosted by: {`${lastName}, ${firstName}`}</p>
          <p>{description}</p>
        </div>
        <div className="reserve-area">
          <span>
            <p>{`$${price}`}</p>
            <p>night</p>
          </span>
          <p>
            ★{" "}
            {avgStarRating
              ? `${avgStarRating.toFixed(1)} | ${numReviews}`
              : "New"}
          </p>
          <button>Reserve</button>
        </div>
      </div>
    </div>
  );
}

export default Spots;
