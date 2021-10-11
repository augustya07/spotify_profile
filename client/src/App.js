import {useState, useEffect} from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useLocation,
} from "react-router-dom";
import {accessToken, logout} from "./spotify";

import Recommendation from "./pages/Recommendation";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Tracks from "./pages/Tracks";
import Album from "./pages/Album";
import Nav from "./components/Nav";

// Scroll to top of page when changing routes
// https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const [token, setToken] = useState(null);

    useEffect(() => {
        setToken(accessToken);
    }, []);

    return (
        <div className="app">
            {!token ? (
                <Login/>
            ) : (
                <>
                    <Router>
                        <ScrollToTop/>
                      <Nav/>
                        <Switch>
                            <Route path="/profile">
                                <Profile/>
                            </Route>

                            <Route path="/tracks">
                                <Tracks/>
                            </Route>
                            <Route path="/album">
                                <Album/>
                            </Route>
                            <Route path="/">
                                <Album/>
                            </Route>
                        </Switch>
                    </Router>
                </>
            )}
        </div>
    );
}

export default App;
