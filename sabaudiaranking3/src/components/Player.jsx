import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetPlayerFromDB,
  GetPlayerHistoryFromDB,
  updatePlayerPseudo,
} from "../services/FirebaseService";
import { GetButtonTheme, GetThemeColor2 } from "../utility/Formatting";
import { GetDateFromString } from "../utility/Utility";
import Globals from "../utility/Globals";
import { GetPseudoOrDefaultForPlayer } from "../utility/PlayerUtility";
import edit from "../assets/IconEdit.png";
import validate from "../assets/IconValidate.png";

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
    Key: "...",
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

  const [editPseudo, setEditPseudo] = useState(false);
  const [pseudo, setPseudo] = useState("");

  return (
    <div
      className={
        (Globals.Theme == "Dark" ? "text-white " : "text-red-800 ") +
        "flex h-full flex-col ml-5 mr-5 text-center"
      }
    >
      <div className="flex flex-row justify-center mb-2">
        {!editPseudo && (
          <h1 className="text-base font-bold mt-5">
            {GetPseudoOrDefaultForPlayer(player)}
          </h1>
        )}
        {!editPseudo && (
          <img
            src={edit}
            className="h-5 w-5 ml-1 mt-5 bg-slate-500"
            onClick={() => setEditPseudo(true)}
          ></img>
        )}
        {editPseudo && (
          <input
            className="text-base mt-4 border-2 border-black"
            type="text"
            label="pseudo"
            value={pseudo}
            onChange={(e) => {
              setPseudo(e.target.value);
              updatePlayerPseudo(player.Key, e.target.value);
            }}
            onBlur={() => {
              setEditPseudo(false);
            }}
            required
            placeholder="pseudo"
          />
        )}
        {editPseudo && (
          <img
            src={validate}
            className="h-5 w-5 ml-1 mt-5 bg-slate-500"
            onClick={() => setEditPseudo(false)}
          ></img>
        )}
      </div>

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
        className={GetButtonTheme() + " m-1 mb-5 mt-auto"}
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
    </div>
  );
};

export default Player;
