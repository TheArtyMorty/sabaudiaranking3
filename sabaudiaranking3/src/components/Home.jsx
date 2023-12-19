import { useNavigate } from "react-router-dom";
import {
  GetButtonStyle,
  GetContainerStyle,
  GetTextStyle,
} from "../utility/Formatting";
import Globals from "../utility/Globals";

const Home = () => {
  const navigate = useNavigate();
  const GoToScoringPage = (e) => {
    e.preventDefault();
    navigate("/sabaudiaranking3/scoring");
  };
  const GoToRankingPage = (e) => {
    e.preventDefault();
    navigate("/sabaudiaranking3/classement");
  };
  const GoToOptionsPage = (e) => {
    e.preventDefault();
    navigate("/sabaudiaranking3/options");
  };
  const GoToMyPage = (e) => {
    e.preventDefault();
    navigate("/sabaudiaranking3/player/" + Globals.Player);
  };

  return (
    <div className={GetContainerStyle("page")}>
      <h1 className={GetTextStyle("title")}>Sabaudia Ranking ! </h1>
      {Globals.Player != undefined && Globals.Player != "" && (
        <button className={GetButtonStyle()} onClick={GoToMyPage}>
          Ma page
        </button>
      )}
      <button className={GetButtonStyle()} onClick={GoToScoringPage}>
        Ajouter un score
      </button>
      <button className={GetButtonStyle()} onClick={GoToRankingPage}>
        Classement
      </button>
      <button className={GetButtonStyle()} onClick={GoToOptionsPage}>
        Options
      </button>
    </div>
  );
};

export default Home;
