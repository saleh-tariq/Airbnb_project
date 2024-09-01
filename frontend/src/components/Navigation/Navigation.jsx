import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="nav-bar">
      <NavLink to="/">WindBreadNButter</NavLink>
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
