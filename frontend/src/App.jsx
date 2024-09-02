import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Spots from "./components/Spots";
import SpotById from "./components/SpotById";
import Reviews from "./components/Reviews";
import NewSpot from "./components/NewSpot";
import * as sessionActions from "./store/session";

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Spots />,
      },
      {
        path: "/spots/current",
        element: <Spots current={true} />,
      },
      {
        path: "/spots/:spotId",
        element: (
          <>
            <SpotById />
            <Reviews />
          </>
        ),
      },
      {
        path: "/spots/:spotId/edit",
        element: <NewSpot update={true} />,
      },
      {
        path: "/spots",
        element: (
          <>
            <SpotById />
            <Reviews />
          </>
        ),
      },
      {
        path: "/spots/new",
        element: <NewSpot />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
