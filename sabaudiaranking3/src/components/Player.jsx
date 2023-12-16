import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetPlayerFromDB,
  GetPlayerHistoryFromDB,
} from "../services/FirebaseService";
import { GetContainerStyle, GetTextStyle } from "../utility/Formatting";

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
      .sort((a, b) => a.Date - b.Date)
      .map((g, index) => {
        return (
          <div
            className={GetContainerStyle("horizontal") + " bg-blue-200"}
            key={index}
            onTouchEnd={() => navigate("/sabaudiaranking3/games/" + g.ID)}
          >
            <h1 className={GetTextStyle("bold")}>
              {g.IWasOnTeam == g.Victory ? "Victoire" : "Défaite"}
            </h1>
            <h1 className={GetTextStyle("default")}>
              {(g.IWasOnTeam == g.Victory ? " --> gagné " : " --> perdu ") +
                (g.Gain != undefined ? g.Gain : " -?- ") +
                " Pts"}
            </h1>
          </div>
        );
      });
  };

  return (
    <div className={GetContainerStyle("page")}>
      <h1 className={GetTextStyle("bold")}>{player.Pseudo}</h1>
      <h1 className={GetTextStyle("default")}>
        Actuellement classé #{player.Rank} avec {player.MMR} points.
      </h1>
      <h1 className={GetTextStyle("default")}>
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

      <h1 className={GetTextStyle("default")}>Historique des parties</h1>
      <div className={GetContainerStyle("scrolllist")}>{GetPlayerGames()}</div>
    </div>
  );
};

export default Player;
