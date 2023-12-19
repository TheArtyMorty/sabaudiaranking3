import { useNavigate } from "react-router-dom";
import {
  GetButtonStyle,
  GetContainerStyle,
  GetTextStyle,
} from "../utility/Formatting";

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

  return (
    <div className={GetContainerStyle("page")}>
      <h1 className={GetTextStyle("title")}>Sabaudia Ranking ! </h1>
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
