import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GetPlayerListFromDB,
  addScore,
  updatePlayerMMR,
} from "../services/FirebaseService";
import {
  GetButtonStyle,
  GetContainerStyle,
  GetInputStyle,
  GetSelectStyle,
  GetTextStyle,
} from "../utility/Formatting";
import { toast } from "react-toastify";
import Select from "react-select";
import { defaultPlayer } from "../utility/PlayerUtility";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";

const Scoring = () => {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const navigate = useNavigate();
  if (!dbInitialized) {
    GetPlayerListFromDB(setPlayerList);
    setDBInitialized(true);
  }

  const isSetOfficial = (a, b) => {
    const scoreA = Math.floor(a);
    const scoreB = Math.floor(b);
    return (
      (scoreA == 21 && scoreB < 20) ||
      (scoreB == 21 && scoreA < 20) ||
      (scoreA == 30 && scoreB == 29) ||
      (scoreA == 29 && scoreB == 30) ||
      (scoreA >= 20 &&
        scoreB >= 20 &&
        scoreA <= 30 &&
        scoreB <= 30 &&
        Math.abs(scoreA - scoreB) == 2)
    );
  };

  const isSetValid = (a, b, setNumber) => {
    if (isNaN(a) || isNaN(b)) {
      toast.error(
        `Erreur : Format de score incorrect pour le set` + setNumber + `...`
      );
      return false;
    }
    const scoreA = Math.floor(a);
    const scoreB = Math.floor(b);

    return scoreA != scoreB;
  };

  const getTeamNote = (p1, p2) => {
    const maxMmr = Math.max(p1.MMR, p2.MMR);
    const minMmr = Math.min(p1.MMR, p2.MMR);
    return Math.round(
      (maxMmr - minMmr) / minMmr >= 0.4
        ? (maxMmr * 1.5 + minMmr) / 2.5
        : (maxMmr + 1.5 * minMmr) / 2.5
    );
  };

  const getMmrGain = (
    player1,
    player2,
    player3,
    player4,
    twosets,
    ptsWinner,
    ptsLooser
  ) => {
    //Notes
    const noteA = getTeamNote(player1, player2);
    const noteB = getTeamNote(player3, player4);
    //Ecart
    const lowMmrMoyen = Math.min(noteA, noteB);
    const topMmrMoyen = Math.max(noteA, noteB);
    const ecart = topMmrMoyen / lowMmrMoyen - 1;
    //proba win
    const probaWl = Math.max(0.1, 0.5 - ecart);
    const probaWt = Math.min(0.9, 0.5 + ecart);
    //gain
    const gain = Math.max(30 * (noteA > noteB ? probaWt : probaWl), 1);
    // bonuses
    const bonus2sets = twosets ? 5 * (noteA > noteB ? probaWl : probaWt) : 0;
    const bonusPts =
      Math.min(Math.floor((ptsWinner - ptsLooser) / ptsLooser / 0.05), 5) *
      (noteA > noteB ? probaWl : probaWt);
    /*console.log("------");
    console.log(noteA);
    console.log(noteB);
    console.log(lowMmrMoyen);
    console.log(topMmrMoyen);
    console.log(ecart);
    console.log(probaWl);
    console.log(probaWt);
    console.log(gain);
    console.log(bonus2sets);
    console.log(bonusPts);*/
    return Math.floor(gain + bonus2sets + bonusPts);
  };

  const validateGame = () => {
    //Check players are properly set
    if (
      player1.Pseudo == "..." ||
      player2.Pseudo == "..." ||
      player3.Pseudo == "..." ||
      player4.Pseudo == "..."
    ) {
      toast.error(`Erreur : Certains joueurs ne sont pas choisis...`);
      return;
    }
    //Check players are unique
    if (
      player1 == player2 ||
      player1 == player3 ||
      player1 == player4 ||
      player2 == player3 ||
      player2 == player4 ||
      player3 == player4
    ) {
      toast.error("Erreur", `Erreur : Des joueurs apparaissent en double...`);
      return;
    }
    // check scores are valid
    let scoreFede = true;
    if (!isSetValid(A1, B1, 1) || !isSetValid(A2, B2, 2)) {
      return;
    }
    if (!isSetOfficial(A1, B1) || !isSetOfficial(A2, B2)) {
      scoreFede = false;
    }

    const a1 = Math.floor(A1);
    const a2 = Math.floor(A2);
    const b1 = Math.floor(B1);
    const b2 = Math.floor(B2);
    let a3 = Math.floor(A3);
    let b3 = Math.floor(B3);
    const v1 = a1 > b1 ? "A" : "B";
    const v2 = a2 > b2 ? "A" : "B";
    let winner;
    if (v1 != v2) {
      if (!isSetValid(A3, B3, 3)) {
        return;
      }
      if (!isSetOfficial(A3, B3)) {
        scoreFede = false;
      }
      winner = a3 > b3 ? "A" : "B";
    } else {
      winner = v1;
      a3 = "-";
      b3 = "-";
    }

    // All is valid
    const scoreA = a1 + a2 + (isNaN(a3) ? 0 : a3);
    const scoreB = b1 + b2 + (isNaN(b3) ? 0 : b3);
    const mmrGain = getMmrGain(
      player1,
      player2,
      player3,
      player4,
      v1 == v2,
      winner == "A" ? scoreA : scoreB,
      winner == "A" ? scoreB : scoreA
    );
    const mmr = winner == "A" ? mmrGain : -mmrGain;

    //alert en cas de match pas fédé
    const invalidMessage = scoreFede
      ? ""
      : "Attention : Au moins un des set n'est pas valide selon la fédé... \n \n";

    const options = {
      title: "Partie valide",
      message:
        invalidMessage +
        "Victoire de l'équipe " +
        winner +
        ".\n L'équipe " +
        winner +
        " va marquer " +
        Math.abs(mmr) +
        " points. \n L'autre équipe va perdre " +
        Math.abs(mmr) +
        " points." +
        "\n Confirmez vous ce résultat ?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // log game
            addScore(
              player1,
              player2,
              player3,
              player4,
              winner,
              mmrGain,
              a1,
              a2,
              a3,
              b1,
              b2,
              b3
            );
            //Update mmr
            updatePlayerMMR(player1.Key, player1.MMR + mmr);
            updatePlayerMMR(player2.Key, player2.MMR + mmr);
            updatePlayerMMR(player3.Key, player3.MMR - mmr);
            updatePlayerMMR(player4.Key, player4.MMR - mmr);
            navigate(-1);
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };

    confirmAlert(options);
  };

  const GetPlayerList = () => {
    return playerList
      .sort((a, b) => a.Pseudo.localeCompare(b.Pseudo))
      .map((p) => {
        return { value: p, label: p.Pseudo };
      });
  };

  const [player1, setPlayer1] = useState(defaultPlayer);
  const [player2, setPlayer2] = useState(defaultPlayer);
  const [player3, setPlayer3] = useState(defaultPlayer);
  const [player4, setPlayer4] = useState(defaultPlayer);
  const [A1, setA1] = useState("");
  const [A2, setA2] = useState("");
  const [A3, setA3] = useState("");
  const [B1, setB1] = useState("");
  const [B2, setB2] = useState("");
  const [B3, setB3] = useState("");
  const handleChange = (e, setNumber, team) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      switch (team) {
        case "A":
          switch (setNumber) {
            case "1":
              setA1(e.target.value);
              break;
            case "2":
              setA2(e.target.value);
              break;
            case "3":
            default:
              setA3(e.target.value);
              break;
          }
          break;
        case "B":
        default:
          switch (setNumber) {
            case "1":
              setB1(e.target.value);
              break;
            case "2":
              setB2(e.target.value);
              break;
            case "3":
            default:
              setB3(e.target.value);
              break;
          }
      }
    }
  };

  return (
    <div className={GetContainerStyle("page")}>
      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Equipe A</h1>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 1 : </h1>
          <Select
            className={GetSelectStyle("player")}
            defaultValue={player1}
            onChange={setPlayer1}
            options={GetPlayerList()}
          ></Select>
        </div>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 2 : </h1>
          <Select
            className={GetSelectStyle("player")}
            defaultValue={player2}
            onChange={setPlayer2}
            options={GetPlayerList()}
          ></Select>
        </div>
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <div className={GetContainerStyle("horizontal")}>
          <input
            className={GetInputStyle("score") + " w-8"}
            type="text"
            maxLength={2}
            value={A1}
            onChange={(e) => handleChange(e, "1", "A")}
            placeholder="..."
          ></input>
          <input
            className={GetInputStyle("score")}
            type="text"
            maxLength={2}
            value={A2}
            onChange={(e) => handleChange(e, "2", "A")}
            placeholder="..."
          ></input>
          <input
            className={GetInputStyle("score")}
            type="text"
            maxLength={2}
            value={A3}
            onChange={(e) => handleChange(e, "3", "A")}
            placeholder="..."
          ></input>
        </div>
        <div className={GetContainerStyle("horizontal")}>
          <input
            className={GetInputStyle("score")}
            type="text"
            maxLength={2}
            value={B1}
            onChange={(e) => handleChange(e, "1", "B")}
            placeholder="..."
          ></input>
          <input
            className={GetInputStyle("score")}
            type="text"
            maxLength={2}
            value={B2}
            onChange={(e) => handleChange(e, "2", "B")}
            placeholder="..."
          ></input>
          <input
            className={GetInputStyle("score")}
            type="text"
            maxLength={2}
            value={B3}
            onChange={(e) => handleChange(e, "3", "B")}
            placeholder="..."
          ></input>
        </div>
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Equipe B</h1>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 1 : </h1>
          <Select
            className={GetSelectStyle("player")}
            defaultValue={player3}
            onChange={setPlayer3}
            options={GetPlayerList()}
          ></Select>
        </div>
        <div className={GetContainerStyle("horizontal")}>
          <h1 className={GetTextStyle("")}>Joueur 2 : </h1>
          <Select
            className={GetSelectStyle("player")}
            defaultValue={player4}
            onChange={setPlayer4}
            options={GetPlayerList()}
          ></Select>
        </div>
      </div>

      <button className={GetButtonStyle()} onClick={validateGame}>
        Valider la partie
      </button>
    </div>
  );
};

export default Scoring;