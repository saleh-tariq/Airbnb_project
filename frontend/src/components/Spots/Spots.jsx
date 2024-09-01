import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Spots.css";

function Spots() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.refreshSpots());
  }, [dispatch]);

  const handleClick = useNavigate();

  const spots = Object.values(useSelector((state) => state.spots));

  return (
    <div className="spots">
      {spots.map((s) => (
        <div
          key={s.id}
          className="spot"
          onClick={() => handleClick("/spots/" + s.id)}
        >
          <div
            className="spot-img-container"
            style={{ backgroundImage: `url(${s.previewImage})` }}
          >
            <div className="spot-img-container-fore">
              <p className="spot-hover-disc">{s.description}</p>
            </div>
          </div>
          <div className="spot-text">
            <span className="spot-address-line">
              <h2>{s.city + ", " + s.state}</h2>
              <p className="spot-rating">
                ★ {s.avgStarRating ? s.avgStarRating.toFixed(1) : "New"}
              </p>
            </span>
            <span className="spot-price-night">
              <p id="spot-price">{"$" + s.price.toFixed(2)}</p>
              <p>night</p>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Spots;
