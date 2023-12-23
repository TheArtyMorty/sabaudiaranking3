import { useState } from "react";
import Select from "react-select";
import { defaultPlayer } from "../utility/PlayerUtility";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Globals from "../utility/Globals.js";
import { GetPlayerListFromDB } from "../services/FirebaseService.js";
import {
  GetButtonStyle,
  GetContainerStyle,
  GetSelectStyle,
  GetTextStyle,
} from "../utility/Formatting.js";
import {
  getPlayer,
  getTheme,
  storeAdmin,
  storeClub,
  storePlayer,
  storeTheme,
} from "../utility/LocalService.js";
import { useNavigate } from "react-router-dom";

function OptionsScreen({ logout, refresh }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({
    value: "Bleu",
    label: "Bleu",
  });
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [player, setPlayer] = useState({
    value: defaultPlayer.Key,
    label: defaultPlayer.Pseudo,
  });

  if (!dbInitialized) {
    GetPlayerListFromDB(setPlayerList);
    setDBInitialized(true);
    //Theme init
    const t = getTheme();
    setTheme({
      value: t,
      label: t,
    });
  }

  if (playerList.length > 0 && player.value == "") {
    const myID = getPlayer();
    if (
      myID != undefined &&
      playerList.find((p) => p.Key == myID) != undefined
    ) {
      setPlayer({
        value: myID,
        label: playerList.find((p) => p.Key == myID).Pseudo,
      });
    }
  }

  const GetPlayerList = () => {
    return (
      playerList
        //.sort((a, b) => a.Pseudo.localeCompare(b.Pseudo))
        .map((p) => {
          return { value: p.Key, label: p.Pseudo };
        })
    );
  };

  const GetThemes = () => {
    return [
      { value: "Bleu", label: "Bleu" },
      { value: "Orange", label: "Orange" },
    ];
  };

  const ChangeAppTheme = (t) => {
    setTheme(t);
    storeTheme(t);
    Globals.Theme = t;
    refresh(true);
  };

  const Disconnect = () => {
    const options = {
      title: "Déconnexion",
      message:
        "Vous allez vous déconnecter du club " +
        Globals.ClubName +
        ". Confirmez vous?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // logout
            Globals.ClubName = "";
            Globals.Admin = "";
            Globals.Player = "";
            storeClub("");
            storeAdmin("false");
            storePlayer("");
            logout();
            navigate("/sabaudiaranking3/");
          },
        },
        {
          label: "No",
          onClick: () => {},
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

  return (
    <div className={GetContainerStyle("page")}>
      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Options du Club</h1>
        <h1 className={GetTextStyle("bold")}>-----------------</h1>
        <h1 className={GetTextStyle("")}>
          Vous êtes connecté au club {Globals.ClubName}.
        </h1>
        {Globals.Admin == "true" && (
          <button
            className={GetButtonStyle()}
            onClick={() => navigate("/sabaudiaranking3/addPlayer/")}
          >
            Ajouter un joueur
          </button>
        )}
        <button className={GetButtonStyle()} onClick={Disconnect}>
          Se déconnecter
        </button>
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Options du joueur</h1>
        <h1 className={GetTextStyle("bold")}>-----------------</h1>
        <h1 className={GetTextStyle("")}>Qui êtes vous ?</h1>

        <Select
          className={GetSelectStyle("player")}
          value={player}
          onChange={(e) => {
            setPlayer(e);
            storePlayer(e.value);
            Globals.Player = e.value;
          }}
          options={GetPlayerList()}
        />
      </div>

      <div className={GetContainerStyle("subcontainer")}>
        <h1 className={GetTextStyle("bold")}>Options d'interface</h1>
        <h1 className={GetTextStyle("bold")}>-----------------</h1>
        <h1 className={GetTextStyle("")}>Theme graphique :</h1>
        <div className={GetContainerStyle("horizontal")}>
          <Select
            className={GetSelectStyle("player")}
            defaultValue={theme}
            onChange={(e) => {
              ChangeAppTheme(e.value);
            }}
            options={GetThemes()}
          />
        </div>
      </div>

      <button className={GetButtonStyle()} onClick={() => navigate(-1)}>
        Retour
      </button>
    </div>
  );
}

export default OptionsScreen;
