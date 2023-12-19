import "./App.css";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import Scoring from "./components/Scoring";
import Player from "./components/Player";
import Game from "./components/Game";
import Club from "./components/Club";
import Options from "./components/Options";
import { ToastContainer } from "react-toastify";
import { GetContainerStyle } from "./utility/Formatting";
import { useState } from "react";
import { getClub } from "./utility/LocalService";

function App() {
  const club = getClub();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (club != undefined && club != "" && !isLoggedIn) {
    setIsLoggedIn(true);
  }

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  const getLoadingPage = () => {
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return <Home />;
    } else {
      return <Navigate to="/sabaudiaranking3/club" />;
    }
  };

  return (
    <div id="root" className={GetContainerStyle("main")}>
      <Router>
        <Routes>
          <Route path="/sabaudiaranking3" element={getLoadingPage()} />
          <Route
            path="/sabaudiaranking3/player/:playerID"
            element={<Player />}
          />
          <Route path="/sabaudiaranking3/games/:gameID" element={<Game />} />
          <Route path="/sabaudiaranking3/classement" element={<Ranking />} />
          <Route path="/sabaudiaranking3/scoring" element={<Scoring />} />
          <Route
            path="/sabaudiaranking3/club"
            element={<Club login={logIn} />}
          />
          <Route path="/sabaudiaranking3/options" element={<Options />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
