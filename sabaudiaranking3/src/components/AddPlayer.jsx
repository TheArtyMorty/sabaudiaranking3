import { useNavigate } from "react-router-dom";
import { GetButtonTheme } from "../utility/Formatting";
import { addPlayer } from "../services/FirebaseService";
import { toast } from "react-toastify";
import { useState } from "react";
import Globals from "../utility/Globals";

const AddPlayer = () => {
  const navigate = useNavigate();
  const [pseudo, setPseudo] = useState("");

  const createPlayer = () => {
    if (pseudo != "") {
      addPlayer("", "", pseudo);
      navigate(-1);
      toast.info(`Le joueur ${pseudo} a été ajouté avec succès !`);
    } else {
      toast.warning(`Veuillez choisir un pseudo pour le joueur...`);
    }
  };

  return (
    <div
      className={
        (Globals.Theme == "Dark" ? "text-white " : "text-red-800 ") +
        "flex h-full flex-col p-5 text-center"
      }
    >
      <h1 className="text-base font-bold self-center">
        Création du joueur...{" "}
      </h1>
      <div className="flex flex-row self-center">
        <h1 className="text-base font-bold self-center">Pseudo : </h1>
        <input
          className="h-8 m-2 text-base border-stone-300 border-2"
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="..."
        ></input>
      </div>
      <button className={GetButtonTheme() + " m-5"} onClick={createPlayer}>
        Ajouter le joueur
      </button>
      <button
        className={GetButtonTheme() + " m-1 mt-auto"}
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
    </div>
  );
};

export default AddPlayer;
