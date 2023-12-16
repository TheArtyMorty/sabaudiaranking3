import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import Scoring from "./components/Scoring";
import Player from "./components/Player";
import Game from "./components/Game";
import Options from "./components/Options";
import { ToastContainer } from "react-toastify";
import { GetContainerStyle } from "./utility/Formatting";

function App() {
  return (
    <div id="root" className={GetContainerStyle("main")}>
      <Router>
        <Routes>
          <Route path="/sabaudiaranking3" element={<Home />} />
          <Route
            path="/sabaudiaranking3/player/:playerID"
            element={<Player />}
          />
          <Route path="/sabaudiaranking3/games/:gameID" element={<Game />} />
          <Route path="/sabaudiaranking3/classement" element={<Ranking />} />
          <Route path="/sabaudiaranking3/scoring" element={<Scoring />} />
          <Route path="/sabaudiaranking3/options" element={<Options />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
