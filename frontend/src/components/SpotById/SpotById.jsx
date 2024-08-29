import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Spots() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getSpotDetails(spotId));
  }, [dispatch]);

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
  } = spot;
  const { firstName, lastName } = spot.Owner || {
    firstName: null,
    lastName: null,
  };
  const spotImages = spot.SpotImages;

  return (
    <>
      <div>
        <h2>{name}</h2>
        <p>Location: {`${city}, ${state}, ${country}`}</p>
      </div>
      <div>
        <img src={previewImage}></img>
        {spotImages
          ? spotImages.map((img) =>
              !img.preview ? <img src={img.url} /> : <></>
            )
          : null}
      </div>
      <div>
        <p>Hosted by: {`${lastName}, ${firstName}`}</p>
        <p>{description}</p>
        <div>
          <span>
            <p>{`$${price}`}</p>
            <p>night</p>
          </span>
          <p>{avgStarRating}</p>
          <button>Reserve</button>
        </div>
      </div>
    </>
  );
}

export default Spots;
