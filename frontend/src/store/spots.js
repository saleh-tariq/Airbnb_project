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

export const makeReview = (review, spotId) => async (dispatch) => {
  const options = {
    method: "POST",
    body: JSON.stringify(review),
  };
  console.log(spotId);
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, options);

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    dispatch(getSpotReviews(data.spotId));
  } else return await response.json();
};

export const makeSpot = (spot, images) => async (dispatch) => {
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
        await csrfFetch(url, imageOptions);
      }
    }
    if (allG) {
      dispatch(addSpot(data));
      return `/spots/${data.id}`;
    } else {
      console.log("\n\nBIG UH OH \nBIG UH OH \nBIG UH OH \n\n");
    }
  } else {
    console.log(await response.json());
  }
  return response;
};

export const editSpot = (oldSpot, spot, images) => async (dispatch) => {
  const options = {
    method: "PUT",
    body: JSON.stringify(spot),
  };
  const response = await csrfFetch("/api/spots/" + oldSpot.id, options);
  let allG = true;
  if (response.ok) {
    const data = await response.json();
    const oldImages = oldSpot.SpotImages;
    console.log(oldSpot);
    for (let i = 0; i < oldImages.length; i++) {
      await csrfFetch("/api/spot-images/" + oldImages[i].id, {
        method: "DELETE",
      });
    }
    const imgArray = Object.entries(images);
    for (let i = 0; i < imgArray.length; i++) {
      const [key, value] = imgArray[i];
      if (value) {
        const imageOptions = {
          method: "POST",
          body: JSON.stringify({ url: value, preview: key === "prev" }),
        };
        const url = `/api/spots/${data.id}/images`;
        await csrfFetch(url, imageOptions);
      }
    }
    if (allG) {
      dispatch(addSpot(data));
      return `/spots/${data.id}`;
    }
  }
  return response;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const options = {
    method: "DELETE",
  };
  const response = await csrfFetch("/api/spots/" + spotId, options);

  if (response.ok) {
    return await dispatch(refreshSpots());
  }
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
