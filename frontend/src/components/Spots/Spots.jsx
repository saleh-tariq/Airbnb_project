import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Spots() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.refreshSpots());
  }, []);

  const handleClick = useNavigate();

  const spots = Object.values(useSelector((state) => state.spots));

  return (
    <>
      {spots.map((s) => (
        <div onClick={() => handleClick("/spots/" + s.id)}>
          <img src={s.previewImage} />
          <h1>{s.address}</h1>
          <p>{s.avgStarRating || "New"}</p>
          <p>{s.city + ", " + s.state}</p>
          <span>
            <p>{"$" + s.price}</p>
            <p>night</p>
          </span>
        </div>
      ))}
    </>
  );
}

export default Spots;
