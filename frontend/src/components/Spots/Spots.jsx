import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Spots.css";
import OpenModalButton from "../OpenModalButton";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

function Spots({ current }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.refreshSpots());
  }, [dispatch]);

  const sessionUser = useSelector((state) => state.session.user);

  const [open, setOpen] = useState(false);

  const handleClick = useNavigate();
  const handleUpdateClick = useNavigate();
  const handleDeleteClick = () => {
    setOpen(true);
  };

  const spots = Object.values(useSelector((state) => state.spots));
  let newSpots;

  // useEffect(() => {
  //   dispatch(spotActions.refreshSpots());
  // }, [open, dispatch]);

  if (current) {
    newSpots = spots.filter((spot) => {
      console.log(spot.ownerId === sessionUser.id);
      return spot.ownerId === sessionUser.id;
    });
  }

  const onDelete = (id) => () => {
    dispatch(spotActions.deleteSpot(id));
    setOpen(false);
  };

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
              {current ? (
                <div className="current-spot-buttons">
                  <button
                    onClick={() => {
                      handleUpdateClick(`/spots/${s.id}/edit`);
                    }}
                  >
                    Update
                  </button>
                  <OpenModalButton
                    modalComponent={
                      <ConfirmDelete
                        message={
                          "Are you sure you want to remove this spot from the listings?"
                        }
                        onDelete={onDelete(s.id)}
                      />
                    }
                    buttonText={"Delete"}
                  />
                </div>
              ) : null}
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default Spots;
