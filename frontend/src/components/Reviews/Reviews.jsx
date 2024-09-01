import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Reviews.css";

function Reviews() {
  const { spotId } = useParams();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getSpotReviews(spotId));
  }, [dispatch]);

  const spot = useSelector((state) => state.spots)[spotId];
  const { avgStarRating, numReviews } = spot;
  const reviews = spot.Reviews ? Object.values(spot.Reviews) : [];
  return (
    <>
      <h2>
        ★ {avgStarRating ? avgStarRating.toFixed(1) : "New"} | {numReviews}{" "}
        review{numReviews > 1 && "s"}
      </h2>
      {reviews.map((el) => (
        <div key={el.id} className="review">
          <h4>{el.User.firstName}</h4>
          <h6 className="faded">{`${months[el.createdAt.split("-")[1] - 1]} ${
            el.createdAt.split("-")[0]
          }`}</h6>
          <p>{el.review}</p>
          <hr />
        </div>
      ))}
    </>
  );
}

export default Reviews;
