import { useState } from "react";
import "./CreateReview.css";
import * as spotActions from "../../store/spots";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function CreateReview({ spotId }) {
  const { closeModal } = useModal();
  const [stars, setStars] = useState(0);
  const [starsTemp, setStarsTemp] = useState(0);
  const [textField, setTextField] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    setStars(+e.target.id);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const review = { review: textField, stars };
    const data = await dispatch(spotActions.makeReview(review, spotId));
    if (data.message) {
      return setError(data.message);
    }
    closeModal();
  };
  return (
    <div className="create-review-modal">
      <form onSubmit={handleSubmit}>
        <h2>How was your stay?</h2>
        {error ? <p className="error">{error}</p> : null}
        <textarea
          placeholder="Leave your review here..."
          type="text"
          className="create-review-input"
          onInput={(e) => setTextField(e.target.value)}
        />
        <span className="create-review-stars">
          <h3
            id="1"
            onClick={handleClick}
            onMouseEnter={() => {
              setStarsTemp(1);
            }}
            onMouseLeave={() => {
              setStarsTemp(0);
            }}
            className={stars >= 1 || starsTemp >= 1 ? "star yellow" : "star"}
          >
            ★
          </h3>
          <h3
            id="2"
            onClick={handleClick}
            onMouseEnter={() => {
              setStarsTemp(2);
            }}
            onMouseLeave={() => {
              setStarsTemp(0);
            }}
            className={stars >= 2 || starsTemp >= 2 ? "star yellow" : "star"}
          >
            ★
          </h3>
          <h3
            id="3"
            onClick={handleClick}
            onMouseEnter={() => {
              setStarsTemp(3);
            }}
            onMouseLeave={() => {
              setStarsTemp(0);
            }}
            className={stars >= 3 || starsTemp >= 3 ? "star yellow" : "star"}
          >
            ★
          </h3>
          <h3
            id="4"
            onClick={handleClick}
            onMouseEnter={() => {
              setStarsTemp(4);
            }}
            onMouseLeave={() => {
              setStarsTemp(0);
            }}
            className={stars >= 4 || starsTemp >= 4 ? "star yellow" : "star"}
          >
            ★
          </h3>
          <h3
            id="5"
            onClick={handleClick}
            onMouseEnter={() => {
              setStarsTemp(5);
            }}
            onMouseLeave={() => {
              setStarsTemp(0);
            }}
            className={stars >= 5 || starsTemp >= 5 ? "star yellow" : "star"}
          >
            ★
          </h3>
          <h3>Stars</h3>
        </span>
        <button type="submit" disabled={!(textField.length > 10 && stars)}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default CreateReview;
