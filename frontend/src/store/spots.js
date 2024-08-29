import { csrfFetch } from "./csrf";

const ADD_SPOT = "spots/addSpot";
const ADD_DETAILS = "spots/addDetails";

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
    console.log(data);
    dispatch(addDetails(data[0]));
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
    default:
      return state;
  }
};

export default spotReducer;
