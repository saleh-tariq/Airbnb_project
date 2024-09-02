import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Spots.css";

function Spots({ current }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.refreshSpots());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const handleClick = useNavigate();
  const handleUpdateClick = useNavigate();

  const spots = Object.values(useSelector((state) => state.spots));
  let newSpots;

  if (current) {
    newSpots = spots.filter((spot) => {
      console.log(spot.ownerId === sessionUser.id);
      return spot.ownerId === sessionUser.id;
    });
  }

  return (
    <div className="spots-back">
      {current ? <h2 className="current-spots-title">Manage Spots</h2> : null}
      {current ? <NavLink to="/spots/new">Create a New Spot</NavLink> : null}
      <div className="spots">
        {(newSpots || spots).map((s) => (
          <>
            <div key={s.id} className="spot">
              <div
                className="spot-content"
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
              <div className="current-spot-buttons">
                <button
                  onClick={(e) => {
                    handleUpdateClick(`/spots/${s.id}/edit`);
                  }}
                >
                  Update
                </button>
                <button onClick={"handleDeleteClick"}>Delete</button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Spots;
