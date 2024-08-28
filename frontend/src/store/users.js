const ADD_SPOT = "spots/addSpot";

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    payload: spot,
  };
};

export const refreshSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");
  if (response.ok) {
    const data = await response.json();
    data.Spots.forEach((s) => dispatch(addSpot(s)));
  }
  return response;
};

const initialState = {};

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPOT:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default spotReducer;
