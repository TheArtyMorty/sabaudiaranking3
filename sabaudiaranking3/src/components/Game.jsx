import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetGameFromDB } from "../services/FirebaseService";
import { GetButtonTheme } from "../utility/Formatting";
import { GetDateFromString } from "../utility/Utility";
import Globals from "../utility/Globals";
import { GetPseudoOrDefaultForPlayer } from "../utility/PlayerUtility";

const Game = ({ setTransitionDirection }) => {
  const { gameID } = useParams();
  const navigate = useNavigate();
  const [dbInitialized, setDBInitialized] = useState(false);
  const [game, setGame] = useState({
    Date: "",
    Victory: "",
    Scores: {
      Set1: { A: "-", B: "-" },
      Set2: { A: "-", B: "-" },
      Set3: { A: "-", B: "-" },
    },
    TeamA: { player1: { Pseudo: "..." }, player2: { Pseudo: "..." } },
    TeamB: { player1: { Pseudo: "..." }, player2: { Pseudo: "..." } },
    Gain: 0,
    ID: "",
  });

  if (!dbInitialized) {
    GetGameFromDB(gameID, setGame);
    setDBInitialized(true);
  }

  const handleGetBackClick = () => {
    setTransitionDirection("left-to-right");
    navigate(-1);
  };

  return (
    <div className="text-text flex h-full flex-col p-5 text-center">
      <div className="bg-secondary flex flex-col content-start m-2 items-center">
        <h1 className="text-base font-bold">Equipe A</h1>
        <div className="flex flex-row mb-2 mt-2">
          <h1 className="text-base mr-2">Joueur 1 : </h1>
          <h1 className="text-base italic">
            {GetPseudoOrDefaultForPlayer(game.TeamA.player1)} {"("}
            {game.TeamA.player1.MMR}
            {" pts)"}
          </h1>
        </div>
        <div className="flex flex-row mb-2">
          <h1 className="text-base mr-2">Joueur 2 : </h1>
          <h1 className="text-base italic">
            {GetPseudoOrDefaultForPlayer(game.TeamA.player2)} {"("}
            {game.TeamA.player2.MMR}
            {" pts)"}
          </h1>
        </div>
      </div>

      <div className="bg-secondary flex flex-col content-start m-2 items-center">
        <div className="flex flex-row text-black">
          <h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
            {game.Scores.Set1.A}
          </h1>
          <h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
            {game.Scores.Set2.A}
          </h1>
          <h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
            {game.Scores.Set3.A}
          </h1>
        </div>
        <div className="flex flex-row text-black">
          <h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
            {game.Scores.Set1.B}
          </h1>
          <h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
            {game.Scores.Set2.B}
          </h1>
          <h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
            {game.Scores.Set3.B}
          </h1>
        </div>
      </div>

      <div className="bg-secondary flex flex-col content-start m-2 items-center">
        <h1 className="text-base font-bold">Equipe B</h1>
        <div className="flex flex-row mb-2 mt-2">
          <h1 className="text-base mr-2">Joueur 1 : </h1>
          <h1 className="text-base italic">
            {GetPseudoOrDefaultForPlayer(game.TeamB.player1)} {"("}
            {game.TeamB.player1.MMR}
            {" pts)"}
          </h1>
        </div>
        <div className="flex flex-row mb-2">
          <h1 className="text-base mr-2">Joueur 2 : </h1>
          <h1 className="text-base italic">
            {GetPseudoOrDefaultForPlayer(game.TeamB.player2)} {"("}
            {game.TeamB.player2.MMR}
            {" pts)"}
          </h1>
        </div>
      </div>

      <div className="bg-secondary flex flex-col content-start m-2 items-center">
        <h1 className="text-base font-bold">Résultat :</h1>
        <h1 className="text-base mb-1 mt-1">
          {GetDateFromString(game.Date).toLocaleString()}
        </h1>
        <h1 className="text-base mb-1">
          {"Victoire de l'équipe "} {game.Victory}{" "}
        </h1>
        <h1 className="text-base mb-2">
          Gain de {game.Gain != undefined ? game.Gain : " -?- "}
          {" points"}
        </h1>
      </div>

      <button
        className={GetButtonTheme() + " m-1 mt-auto"}
        onClick={handleGetBackClick}
      >
        Retour
      </button>
    </div>
  );
};

export default Game;
