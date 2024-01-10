import { useState } from "react";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Globals from "../utility/Globals.js";
import { GetButtonTheme } from "../utility/Formatting.js";
import { getTheme, storeTheme, storeUid } from "../utility/LocalService.js";
import { useNavigate } from "react-router-dom";

function OptionsScreen({ refresh, setTransitionDirection }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useState({
    value: "Light",
    label: "Light",
  });
  const [dbInitialized, setDBInitialized] = useState(false);

  if (!dbInitialized) {
    setDBInitialized(true);
    //Theme init
    const t = getTheme();
    setTheme({
      value: t,
      label: t,
    });
  }

  const GetThemes = () => {
    return [
      { value: "Light", label: "Light" },
      { value: "Dark", label: "Dark" },
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
      message: "Vous allez vous déconnecter. Confirmez vous?",
      buttons: [
        {
          label: "Oui",
          onClick: () => {
            // logout
            storeUid("");
            refresh(true);
            navigate("/sabaudiaranking3/");
          },
        },
        {
          label: "Non",
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

  const handleGetBackClick = () => {
    setTransitionDirection("left-to-right");
    navigate(-1);
  };

  return (
    <div
      className={
        (Globals.Theme == "Dark" ? "text-white " : "text-red-800 ") +
        "flex h-full flex-col p-5 text-center"
      }
    >
      <div
        className={
          (Globals.Theme == "Dark" ? "bg-white " : "bg-red-800 ") +
          "flex flex-col content-start bg-opacity-25 m-2 items-center"
        }
      >
        <h1 className="text-lg font-bold mt-2">Informations du Joueur</h1>
        <div
          className={
            (Globals.Theme == "Dark" ? "bg-white " : "bg-red-800 ") +
            "h-0.5 m-2 w-9/12"
          }
        />
        <h1 className="text-base">
          Vous jouez dans le club {Globals.ClubName}.
        </h1>
        <button
          className={GetButtonTheme() + " mt-2 mb-2"}
          onClick={Disconnect}
        >
          Se déconnecter
        </button>
      </div>

      <div
        className={
          (Globals.Theme == "Dark" ? "bg-white " : "bg-red-800 ") +
          "flex flex-col content-start bg-opacity-25 m-2 items-center"
        }
      >
        <h1 className="text-lg font-bold mt-2">{"Options d'interface"}</h1>
        <div
          className={
            (Globals.Theme == "Dark" ? "bg-white " : "bg-red-800 ") +
            "h-0.5 m-2 w-9/12"
          }
        />
        <h1 className="text-base">Theme graphique :</h1>
        <Select
          className="flex-1 text-base w-52 mt-2 mb-5 text-red-800"
          defaultValue={theme}
          onChange={(e) => {
            ChangeAppTheme(e.value);
          }}
          options={GetThemes()}
        />
      </div>

      <button
        className={GetButtonTheme() + " m-1 mt-auto"}
        onClick={handleGetBackClick}
      >
        Retour
      </button>
    </div>
  );
}

export default OptionsScreen;
