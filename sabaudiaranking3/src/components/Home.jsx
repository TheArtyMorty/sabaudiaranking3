import { useNavigate } from "react-router-dom";

import logo from "../assets/icon.png";
import { GetButtonTheme } from "../utility/Formatting";
import Globals from "../utility/Globals";

const Home = ({ setTransitionDirection }) => {
  const navigate = useNavigate();
  const GoToScoringPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/scoring");
  };
  const GoToRankingPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/classement");
  };
  const GoToOptionsPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/options");
  };
  const GoToMyPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/player/" + Globals.Player);
  };

  return (
    <div
      className={
        (Globals.Theme == "Dark" ? "text-white " : "text-red-800 ") +
        "flex h-full flex-col p-5 text-center justify-center"
      }
    >
      <h1 className="text-xl">Bienvenue sur</h1>
      <h1 className="title-xl font-bold mb-10">Sabaudia Ranking</h1>
      <img
        src={logo}
        className={
          (Globals.Theme == "Dark" ? "invert brightness-50 " : "") +
          "h-36 w-36 m-5 self-center animate-bounce-slow"
        }
      ></img>
      {Globals.Player != undefined && Globals.Player != "" && (
        <button className={GetButtonTheme() + " m-1 mb-5"} onClick={GoToMyPage}>
          Ma page
        </button>
      )}
      <button
        className={GetButtonTheme() + " m-1 mb-5"}
        onClick={GoToScoringPage}
      >
        Ajouter un score
      </button>
      <button
        className={GetButtonTheme() + " m-1 mb-5"}
        onClick={GoToRankingPage}
      >
        Classement
      </button>
      <button
        className={GetButtonTheme() + " m-1 mb-5"}
        onClick={GoToOptionsPage}
      >
        Options
      </button>
    </div>
  );
};

export default Home;
