import { act } from "react";
import { csrfFetch } from "./csrf";

const ADD_SPOT = "spots/addSpot";
const ADD_DETAILS = "spots/addDetails";
const ADD_REVIEWS = "spots/addReviews";

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

const addDetails = (spot) => {
  return {
    type: ADD_DETAILS,
    payload: spot,
  };
};

const addReviews = (spot) => {
  return {
    type: ADD_REVIEWS,
    payload: spot,
  };
};

export const refreshSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    data.Spots.forEach((s) => dispatch(addSpot(s)));
  }
  return response;
};

export const getSpotDetails = (spotId) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/" + spotId);
  if (response.ok) {
    const data = await response.json();
    dispatch(addDetails(data[0]));
  }
  return response;
};

export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await csrfFetch("/api/spots/" + spotId + "/reviews");
  if (response.ok) {
    const data = await response.json();
    const res = data.Reviews.reduce(
      (acc, el, id) => {
        const edited = el["ReviewImages"].reduce(
          (acc, el, id) => (acc["ReviewImages"][id] = el),
          { ReviewImages: {} }
        );
        el["ReviewImages"] = edited;
        acc["Reviews"][id] = el;
        return acc;
      },
      { id: spotId, Reviews: {} }
    );
    console.log(res);
    dispatch(addReviews(res));
  }
  return response;
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOT:
      return { ...state, [action.payload.id]: action.payload };
    case ADD_DETAILS:
      return {
        ...state,
        [action.payload.id]: { ...state[action.payload.id], ...action.payload },
      };
    case ADD_REVIEWS:
      state[action.payload.id]["Reviews"] = action.payload["Reviews"];
      return { ...state };
    default:
      return state;
  }
};

export default spotReducer;
