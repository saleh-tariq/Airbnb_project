import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Reviews.css";

function Reviews() {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(spotActions.getSpotReviews(spotId));
  }, [dispatch]);

  const spot = useSelector((state) => state.spots)[spotId];
  return (
    <>
      <h2>REVIEWSSS</h2>
    </>
  );
}

export default Reviews;
