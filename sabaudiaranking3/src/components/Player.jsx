import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  GetPlayerFromDB,
  GetPlayerHistoryFromDB,
  updatePlayerPseudo,
} from "../services/FirebaseService";
import { GetButtonTheme } from "../utility/Formatting";
import { GetDateFromString } from "../utility/Utility";
import Globals from "../utility/Globals";
import { GetPseudoOrDefaultForPlayer } from "../utility/PlayerUtility";
import edit from "../assets/IconEdit.png";
import validate from "../assets/IconValidate.png";
import { PlayerStat } from "./PlayerStat";

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
  const [players, setPlayers] = useState([]);

  if (!dbInitialized) {
    GetPlayerFromDB(playerID, (player, players) => {
      setPlayer(player);
      setPlayers(players);
      GetPlayerHistoryFromDB(playerID, setplayerHistory);
      setDBInitialized(true);
    });
  }

  const GetPlayerGames = () => {
    return playerHistory
      .sort((a, b) => GetDateFromString(b.Date) - GetDateFromString(a.Date))
      .map((g, index) => {
        return (
          <div
            className="bg-secondary flex flex-row content-start"
            key={index}
            onClick={() => navigate("/sabaudiaranking3/games/" + g.ID)}
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

  const GetWinstreak = () => {
    let winstreak = 0;
    let currentWinstreak = 0;
    for (const g of playerHistory) {
      if (g.IWasOnTeam == g.Victory) {
        currentWinstreak++;
      } else {
        winstreak = Math.max(winstreak, currentWinstreak);
        currentWinstreak = 0;
      }
    }
    return Math.max(winstreak, currentWinstreak);
  };

  const GetBestTeammate = () => {
    const map = new Map();
    for (const g of playerHistory) {
      if (g.IWasOnTeam == g.Victory) {
        map.set(g.Partner, (map.get(g.Partner) ?? 0) + 1);
      }
    }
    var best = 0;
    var bestkey = "...";
    map.forEach((value, key) => {
      if (value > best) {
        best = value;
        bestkey = key;
      }
    });
    var bestname = "...";
    if (bestkey != "...") {
      bestname = GetPseudoOrDefaultForPlayer(
        players.find((p) => p.Key == bestkey)
      );
    }
    return { name: bestname, score: best };
  };

  const GetNemesis = () => {
    const map = new Map();
    for (const g of playerHistory) {
      if (g.IWasOnTeam != g.Victory) {
        if (g.IWasOnTeam == "A") {
          map.set(g.TeamB.player1.Key, (map.get(g.TeamB.player1.Key) ?? 0) + 1);
          map.set(g.TeamB.player2.Key, (map.get(g.TeamB.player2.Key) ?? 0) + 1);
        } else if (g.IWasOnTeam == "B") {
          map.set(g.TeamA.player1.Key, (map.get(g.TeamA.player1.Key) ?? 0) + 1);
          map.set(g.TeamA.player2.Key, (map.get(g.TeamA.player2.Key) ?? 0) + 1);
        }
      }
    }
    var best = 0;
    var bestkey = "...";
    map.forEach((value, key) => {
      if (value > best) {
        best = value;
        bestkey = key;
      }
    });
    var bestname = "...";
    if (bestkey != "...") {
      bestname = GetPseudoOrDefaultForPlayer(
        players.find((p) => p.Key == bestkey)
      );
    }
    return { name: bestname, score: best };
  };

  const isMe = player.Key == Globals.Player;
  const [editPseudo, setEditPseudo] = useState(false);
  const [pseudo, setPseudo] = useState("");

  return (
    <div className="text-text flex h-full flex-col ml-5 mr-5 text-center">
      <div className="flex flex-row justify-center mb-2">
        {(!isMe || !editPseudo) && (
          <h1 className="text-base font-bold mt-5">
            {GetPseudoOrDefaultForPlayer(player)}
          </h1>
        )}
        {isMe && !editPseudo && (
          <img
            src={edit}
            className="h-5 w-5 ml-1 mt-5 bg-primary border-2 border-text"
            onClick={() => setEditPseudo(true)}
          ></img>
        )}
        {isMe && editPseudo && (
          <input
            className="text-base mt-4 border-2 border-black text-black"
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
        {isMe && editPseudo && (
          <img
            src={validate}
            className="h-5 w-5 ml-1 mt-5 bg-primary border-2 border-text"
            onClick={() => setEditPseudo(false)}
          ></img>
        )}
      </div>

      <div className="bg-secondary flex flex-col content-start m-2 items-center">
        {playerHistory.length == 0 && (
          <h1 className="text-base">Aucune partie trouvée pour ce joueur.</h1>
        )}
        {playerHistory.length > 0 && (
          <div className="flex flex-row text-black">
            <PlayerStat
              statNumber={`#${player.Rank}`}
              statName={"Classement"}
              statDescription={`Actuellement classé #${player.Rank} avec ${player.MMR} points.`}
              size={"w-28 h-16"}
            />
            <PlayerStat
              statNumber={`${Math.round(
                (playerHistory.filter((g) => g.IWasOnTeam == g.Victory).length /
                  playerHistory.length) *
                  100
              )}%`}
              statName={"Winrate"}
              statDescription={`${
                playerHistory.filter((g) => g.IWasOnTeam == g.Victory).length
              } victoires, ${
                playerHistory.filter((g) => g.IWasOnTeam != g.Victory).length
              } défaites.`}
              size={"w-20 h-16"}
            />
            <PlayerStat
              statNumber={`${GetWinstreak()}`}
              statName={"Winstreak"}
              statDescription={` ${GetWinstreak()} victoires d'affilées`}
              size={"w-24 h-16"}
            />
          </div>
        )}
        {playerHistory.length > 0 && (
          <div className="flex flex-row text-black">
            <PlayerStat
              statNumber={`${GetBestTeammate().name}`}
              statName={"Partenaire"}
              statDescription={`${GetBestTeammate().score} victoires avec ${
                GetBestTeammate().name
              }`}
              size={"w-36 h-16"}
            />
            <PlayerStat
              statNumber={`${GetNemesis().name}`}
              statName={"Némésis"}
              statDescription={`${GetNemesis().score} défaites contre ${
                GetNemesis().name
              }`}
              size={"w-36 h-16"}
            />
          </div>
        )}
      </div>

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
