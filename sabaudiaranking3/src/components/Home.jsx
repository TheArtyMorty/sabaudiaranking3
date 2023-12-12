import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col content-center">
      <h1 className="text-3xl font-bold underline">Sabaudia Ranking ! </h1>
      <button className="" onClick={GoToScoringPage}>
        Ajouter un score
      </button>
      <button className="" onClick={GoToRankingPage}>
        Classement
      </button>
      <button className="" onClick={GoToOptionsPage}>
        Options
      </button>
    </div>
  );
};

export default Home;
