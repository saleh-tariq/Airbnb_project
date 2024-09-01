import { csrfFetch } from "./csrf";
// imageOptions
const ADD_SPOT = "spots/addSpot";
const ADD_DETAILS = "spots/addDetails";
const ADD_REVIEWS = "spots/addReviews";
const CLEAR_SPOTS = "spots/clearSpots";

const clearSpots = () => {
  return {
    type: CLEAR_SPOTS,
  };
};
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
  dispatch(clearSpots());
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
    dispatch(addReviews(res));
  }
  return response;
};

export const makeSpot = (spot, images) => async () => {
  const options = {
    method: "POST",
    body: JSON.stringify(spot),
  };
  const response = await csrfFetch("/api/spots", options);
  let allG = true;
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    const imgArray = Object.entries(images);
    for (let i = 0; i < imgArray.length; i++) {
      const [key, value] = imgArray[i];
      if (value) {
        const imageOptions = {
          method: "POST",
          body: JSON.stringify({ url: value, preview: key === "prev" }),
        };
        const url = `/api/spots/${data.id}/images`;
        const imgResponse = await csrfFetch(url, imageOptions);
        const imgData = await imgResponse.json();
        console.log(data.id);
      }
    }
    if (allG) {
      refreshSpots();
    } else {
      console.log("\n\nBIG UH OH \nBIG UH OH \nBIG UH OH \n\n");
    }
  } else {
    console.log(await response.json());
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
    case CLEAR_SPOTS:
      return {};
    default:
      return state;
  }
};

export default spotReducer;
