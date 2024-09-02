import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Reviews.css";
import OpenModalButton from "../OpenModalButton";
import CreateReview from "./CreateReview";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";

function Reviews() {
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);

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

  const onDelete = (id) => () => {
    dispatch(spotActions.deleteReview(id, spotId));
  };

  useEffect(() => {
    dispatch(spotActions.getSpotReviews(spotId));
  }, [dispatch, spotId]);

  const spot = Object.values(useSelector((state) => state.spots)).find(
    (spt) => spt.id === Number(spotId)
  );
  const { avgStarRating, numReviews } = spot;
  const reviews = spot.Reviews ? Object.values(spot.Reviews) : [];
  return (
    <>
      <h2>
        ★{" "}
        {numReviews
          ? `${avgStarRating.toFixed(1)} | ${numReviews} review${
              numReviews !== 1 ? "s" : ""
            }`
          : "New"}
      </h2>
      <OpenModalButton
        modalComponent={<CreateReview spotId={spotId} />}
        buttonText="Create a review"
      />
      {reviews.reverse().map((el) => (
        <div key={el.id} className="review">
          <h4>{el.User.firstName}</h4>
          <h6 className="faded">{`${months[el.createdAt.split("-")[1] - 1]} ${
            el.createdAt.split("-")[0]
          }`}</h6>
          <p>{el.review}</p>
          {el.userId === sessionUser.id ? (
            <OpenModalButton
              buttonText={"delete"}
              modalComponent={
                <ConfirmDelete
                  message={"Are you sure you want to delete this review?"}
                  onDelete={onDelete(el.id)}
                />
              }
            />
          ) : null}
        </div>
      ))}
    </>
  );
}

export default Reviews;
