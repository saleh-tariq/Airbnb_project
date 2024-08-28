import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Spots() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.refreshSpots());
  }, [dispatch]);

  const spots = useSelector((state) => state.spots);
  const { name, city, state, country, description, previewImage } =
    spots[spotId];

  return (
    <>
      <h2>{name}</h2>
      <p>Location: {`${city}, ${state}, ${country}`}</p>
      <div>
        <img src={previewImage}></img>
      </div>
      <p>Hosted by: {"Tariq, Saleh"}</p>
      <p>{description}</p>
    </>
  );
}

export default Spots;
