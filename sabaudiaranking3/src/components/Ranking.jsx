import { useState } from "react";
import { GetPlayerListFromDB } from "../services/FirebaseService";
import searchLogo from "../assets/IconSearch.png";
import { GetButtonTheme } from "../utility/Formatting";
import { useNavigate } from "react-router-dom";
import Globals from "../utility/Globals";
import {
  GetPlayerMMRForRanking,
  GetPseudoOrDefaultForPlayer,
} from "../utility/PlayerUtility";

const Ranking = ({ setTransitionDirection }) => {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  if (!dbInitialized) {
    GetPlayerListFromDB((playerList) => {
      setPlayerList(playerList);
      setDBInitialized(true);
    });
  }

  const GetPlayerList = () => {
    return playerList
      .sort((a, b) => GetPlayerMMRForRanking(b) - GetPlayerMMRForRanking(a))
      .map((p, index) => {
        var newPlayer = p;
        newPlayer.Rank = index + 1;
        return newPlayer;
      })
      .filter(
        (p) =>
          GetPseudoOrDefaultForPlayer(p)
            .toLocaleUpperCase()
            .indexOf(filter.toLocaleUpperCase()) >= 0
      )
      .map((p, index) => {
        return (
          <div
            className="bg-secondary flex flex-row content-start"
            key={index}
            onClick={() => navigate("/sabaudiaranking3/player/" + p.Key)}
          >
            <h1 className="text-base font-bold">#{p.Rank} -</h1>
            <h1 className="text-base">
              {GetPseudoOrDefaultForPlayer(p)} - {GetPlayerMMRForRanking(p)} Pts
            </h1>
          </div>
        );
      });
  };

  const handleGetBackClick = () => {
    setTransitionDirection("left-to-right");
    navigate(-1);
  };

  return (
    <div className="text-text flex h-full flex-col ml-5 mr-5 text-center">
      <div className="mb-2 mt-5 self-center text-center">
        <h1 className="text-lg font-bold">Classement : </h1>
        <div className="flex flex-row self-center">
          <img
            src={searchLogo}
            className={
              (Globals.Theme == "Dark" ? "" : "invert ") + "h-8 w-8 m-2"
            }
          ></img>
          <input
            className="h-8 m-2 text-base text-black border-stone-300 border-2"
            type="text"
            value={filter}
            onChange={handleChange}
            placeholder="..."
          />
        </div>
      </div>
      <div className="mb-5 overflow-hidden overflow-y-scroll border-2 border-text space-y-1 bg-white">
        {GetPlayerList()}
      </div>
      <button
        className={GetButtonTheme() + " m-1 mb-5 mt-auto"}
        onClick={handleGetBackClick}
      >
        Retour
      </button>
    </div>
  );
};

export default Ranking;
