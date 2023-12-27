import { useState } from "react";
import { GetPlayerListFromDB } from "../services/FirebaseService";
import searchLogo from "../assets/IconSearch.png";
import { GetThemeColor, GetThemeColor2 } from "../utility/Formatting";
import { useNavigate } from "react-router-dom";

const Ranking = () => {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  if (!dbInitialized) {
    GetPlayerListFromDB(setPlayerList);
    setDBInitialized(true);
  }

  const GetPlayerList = () => {
    return playerList
      .sort((a, b) => b.MMR - a.MMR)
      .map((p, index) => {
        var newPlayer = p;
        newPlayer.Rank = index + 1;
        return newPlayer;
      })
      .filter(
        (a) =>
          a.Pseudo.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) >= 0
      )
      .map((p, index) => {
        return (
          <div
            className={GetThemeColor2() + " flex flex-row content-start"}
            key={index}
            onTouchEnd={() => navigate("/sabaudiaranking3/player/" + p.Key)}
          >
            <h1 className="text-base font-bold">#{p.Rank} -</h1>
            <h1 className="text-base">
              {p.Pseudo} - {p.MMR} Pts
            </h1>
          </div>
        );
      });
  };

  return (
    <div className="flex h-full flex-col ml-5 mr-5">
      <div className="mb-2 mt-5 self-center text-center">
        <h1 className="text-lg font-bold">Classement : </h1>
        <div className="flex flex-row self-center">
          <img src={searchLogo} className="h-8 w-8 m-2"></img>
          <input
            className="h-8 m-2 text-base"
            type="text"
            value={filter}
            onChange={handleChange}
            placeholder="..."
          />
        </div>
      </div>
      <div className="mb-5 overflow-hidden overflow-y-scroll border-2 border-black space-y-1 bg-white">
        {GetPlayerList()}
      </div>
      <button
        className={GetThemeColor() + " text-base text-white m-1 mb-5 mt-auto"}
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
    </div>
  );
};

export default Ranking;
