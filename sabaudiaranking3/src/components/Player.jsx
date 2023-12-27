import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetPlayerFromDB,
  GetPlayerHistoryFromDB,
} from "../services/FirebaseService";
import { GetThemeColor, GetThemeColor2 } from "../utility/Formatting";
import { GetDateFromString } from "../utility/Utility";

const Player = () => {
  const { playerID } = useParams();
  const navigate = useNavigate();
  const [dbInitialized, setDBInitialized] = useState(false);
  const [player, setPlayer] = useState({
    FirstName: "",
    LastName: "",
    MMR: 1234,
    Pseudo: "...",
    Rank: 0,
  });
  const [playerHistory, setplayerHistory] = useState([]);

  if (!dbInitialized) {
    GetPlayerFromDB(playerID, setPlayer);
    GetPlayerHistoryFromDB(playerID, setplayerHistory);
    setDBInitialized(true);
  }

  const GetPlayerGames = () => {
    return playerHistory
      .sort((a, b) => GetDateFromString(b.Date) - GetDateFromString(a.Date))
      .map((g, index) => {
        return (
          <div
            className={GetThemeColor2() + " flex flex-row content-start"}
            key={index}
            onTouchEnd={() => navigate("/sabaudiaranking3/games/" + g.ID)}
          >
            <h1 className="text-base italic">
              {GetDateFromString(g.Date).toDateString() + " - "}
            </h1>
            <h1 className="text-base font-bold">
              {g.IWasOnTeam == g.Victory ? " Victoire" : " Défaite"}
            </h1>
            <h1 className="text-base">
              {(g.IWasOnTeam == g.Victory ? " --> gagné " : " --> perdu ") +
                (g.Gain != undefined ? g.Gain : " -?- ") +
                " Pts"}
            </h1>
          </div>
        );
      });
  };

  return (
    <div className="flex h-full flex-col m-5 text-center">
      <h1 className="text-base font-bold">{player.Pseudo}</h1>
      <h1 className="text-base">
        Actuellement classé #{player.Rank} avec {player.MMR} points.
      </h1>
      <h1 className="text-base">
        Winrate :{" "}
        {Math.round(
          (playerHistory.filter((g) => g.IWasOnTeam == g.Victory).length /
            playerHistory.length) *
            100
        )}
        {"% "}
        {"("}
        {playerHistory.filter((g) => g.IWasOnTeam == g.Victory).length} sur{" "}
        {playerHistory.length} {")"}.
      </h1>

      <h1 className="text-base">Historique des parties</h1>
      <div className="mb-5 overflow-hidden overflow-y-scroll border-2 border-black space-y-1 bg-white">
        {GetPlayerGames()}
      </div>

      <button
        className={GetThemeColor() + " text-base text-white m-1 mt-auto"}
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
    </div>
  );
};

export default Player;
