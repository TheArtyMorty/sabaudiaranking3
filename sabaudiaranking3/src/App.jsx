import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Ranking from "./components/Ranking";
import Scoring from "./components/Scoring";
import Player from "./components/Player";
import Options from "./components/Options";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div id="root" className="bg-sky-600">
      <Router>
        <Routes>
          <Route path="/sabaudiaranking3" element={<Home />} />
          <Route
            path="/sabaudiaranking3/player/:playerId"
            element={<Player />}
          />
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
