import { csrfFetch } from "./csrf";

const ADD_SPOTS = "spots/getSpots";

const addSpots = (spots) => {
  return {
    type: ADD_SPOTS,
    payload: spots,
  };
};

export const refreshSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    dispatch(addSpots(data.Spots));
  }
  return response;
};

const initialState = [];

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOTS:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default spotReducer;
