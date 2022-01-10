import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import { accessToken } from "../src/service/spotifyApi";

// import Recommendation from "./pages/Recommendation";
 import Login from "./pages/Login";
// import Profile from "./pages/Profile";
import Tracks from "./pages/Tracks";
import Artist from "./pages/Artist";
import UserFollowedArtist from "./components/FollowedArtist";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Search from "./components/Search";
import Test from "./components/Test";

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    //@ts-ignore
    setToken(accessToken);
  }, []);

  return (
    <div className="app">
      {!token ? (
        <Login />
      ) : (
        <>
          <Router>
            <ScrollToTop />
            <Nav />
            <Switch>
              {/* <Test/> */}

              {/* <Route exact path="/recommendations" component={Recommendation} /> */}
              <Route exact path="/tracks" component={Tracks} />
              <Route exact path="/artist" component={Artist} />
              <Route exact path="/followed" component={UserFollowedArtist} />
              <Route exact path="/search" component={Search} />
              {/* <Route exact path="/profile" component={Profile} /> */}

              <Route exact path="/" component={Home} />
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
