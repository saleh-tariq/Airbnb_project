import { useDispatch, useSelector } from "react-redux";
import * as spotActions from "../../store/spots";
import { useEffect } from "react";

function Spots() {
  const dispatch = useDispatch();
  //   dispatch(spotActions.refreshSpots());

  //   const spots = useSelector((state) => state.spots);
  console.log(spots);
  return (
    <>
      {/* {spots.map((s) => (
        <h1>{s.name}</h1>
      ))} */}
    </>
  );
}

export default Spots;
