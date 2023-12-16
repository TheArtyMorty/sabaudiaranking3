import { useState } from "react";
import { useParams } from "react-router-dom";
import { GetGameFromDB } from "../services/FirebaseService";
import { GetContainerStyle, GetTextStyle } from "../utility/Formatting";

const Game = () => {
  const { gameID } = useParams();
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

  return (
    <div className={GetContainerStyle("page")}>
      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Equipe A</h1>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 1 : </h1>
          <h1 className={GetTextStyle("")}>
            {game.TeamA.player1.Pseudo} {"("}
            {game.TeamA.player1.MMR}
            {" pts)"}
          </h1>
        </div>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 2 : </h1>
          <h1 className={GetTextStyle("")}>
            {game.TeamA.player2.Pseudo} {"("}
            {game.TeamA.player2.MMR}
            {" pts)"}
          </h1>
        </div>
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("score")}>{game.Scores.Set1.A}</h1>
          <h1 className={GetTextStyle("score")}>{game.Scores.Set2.A}</h1>
          <h1 className={GetTextStyle("score")}>{game.Scores.Set3.A}</h1>
        </div>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("score")}>{game.Scores.Set1.B}</h1>
          <h1 className={GetTextStyle("score")}>{game.Scores.Set2.B}</h1>
          <h1 className={GetTextStyle("score")}>{game.Scores.Set3.B}</h1>
        </div>
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Equipe B</h1>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 1 : </h1>
          <h1 className={GetTextStyle("")}>
            {game.TeamB.player1.Pseudo} {"("}
            {game.TeamB.player1.MMR}
            {" pts)"}
          </h1>
        </div>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 2 : </h1>
          <h1 className={GetTextStyle("")}>
            {game.TeamB.player2.Pseudo} {"("}
            {game.TeamB.player2.MMR}
            {" pts)"}
          </h1>
        </div>
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Résultat :</h1>
        <h1 className={GetTextStyle("")}>
          {"Victoire de l'équipe "} {game.Victory}{" "}
        </h1>
        <h1 className={GetTextStyle("")}>
          Gain de {game.Gain != undefined ? game.Gain : " -?- "}
          {" points"}
        </h1>
      </div>
    </div>
  );
};

export default Game;
