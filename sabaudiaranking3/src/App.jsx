import "./App.css";
import "./App.css";

import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AddPlayer from "./components/AddPlayer";
import Game from "./components/Game";
import Home from "./components/Home";
import Options from "./components/Options";
import Player from "./components/Player";
import Ranking from "./components/Ranking";
import Login from "./components/Login";
import Scoring from "./components/Scoring";
import { GetBackgroundColor } from "./utility/Formatting";
import Globals from "./utility/Globals";
import { getTheme, getUid } from "./utility/LocalService";
import { GetUserFromDB } from "./services/FirebaseService";

function App({ refresh }) {
  const [needRefresh, setNeedRefresh] = useState(true);
  const [transitionDirection, setTransitionDirection] =
    useState("right-to-left");
  const location = useLocation();

  if (needRefresh) {
    Globals.UserId = getUid();
    if (
      Globals.UserId != "" &&
      Globals.UserId != undefined &&
      Globals.UserId != null
    ) {
      GetUserFromDB(
        Globals.UserId,
        (c) => {
          Globals.ClubName = c;
        },
        (k) => {
          Globals.Player = k;
        },
        (a) => {
          Globals.Admin = a;
        }
      );
    } else {
      Globals.UserId = "";
    }
    Globals.Theme = getTheme();
    setNeedRefresh(false);
    refresh(true);
  }

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.key}
        classNames={transitionDirection}
        timeout={300}
      >
        <Routes location={location}>
          <Route
            path="/sabaudiaranking3"
            element={<Home setTransitionDirection={setTransitionDirection} />}
          />
          <Route
            path="/sabaudiaranking3/player/:playerID"
            element={<Player />}
          />
          <Route
            path="/sabaudiaranking3/games/:gameID"
            element={<Game setTransitionDirection={setTransitionDirection} />}
          />
          <Route
            path="/sabaudiaranking3/classement"
            element={
              <Ranking setTransitionDirection={setTransitionDirection} />
            }
          />
          <Route
            path="/sabaudiaranking3/scoring"
            element={
              <Scoring setTransitionDirection={setTransitionDirection} />
            }
          />
          <Route path="/sabaudiaranking3/addPlayer" element={<AddPlayer />} />
          <Route
            path="/sabaudiaranking3/options"
            element={
              <Options
                refresh={setNeedRefresh}
                setTransitionDirection={setTransitionDirection}
              />
            }
          />
          <Route
            path="/sabaudiaranking3/login"
            element={
              <Login
                refresh={setNeedRefresh}
                setTransitionDirection={setTransitionDirection}
              />
            }
          />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}

const Root = () => {
  const [needRefresh, setNeedRefresh] = useState(false);

  if (needRefresh) {
    setNeedRefresh(false);
  }

  return (
    <div id="root" className={GetBackgroundColor() + " h-screen w-screen"}>
      <BrowserRouter>
        <App refresh={setNeedRefresh} />{" "}
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default Root;
