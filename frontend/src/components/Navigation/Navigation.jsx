import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { FaAirbnb } from "react-icons/fa";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <NavLink to="/">
        <div className="logo">
          <FaAirbnb />
          WindPlacesAndSpots
        </div>
      </NavLink>
      {isLoaded && (
        <div className="nav-bar-profile">
          {sessionUser ? (
            <NavLink to="/spots/new">Create a New Spot +</NavLink>
          ) : null}
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;
