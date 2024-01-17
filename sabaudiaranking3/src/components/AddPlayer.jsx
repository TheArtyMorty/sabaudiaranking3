import { useNavigate } from "react-router-dom";
import { GetButtonTheme } from "../utility/Formatting";
import { addPlayer } from "../services/FirebaseService";
import { toast } from "react-toastify";
import { useState } from "react";
import Globals from "../utility/Globals";

const AddPlayer = () => {
  const navigate = useNavigate();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");

  const createPlayer = () => {
    if (first != "") {
      addPlayer(last, first, "");
      navigate(-1);
      toast.info(`Le joueur ${first} ${last} a été ajouté avec succès !`);
    } else {
      toast.warning(`Veuillez choisir un prénom pour le joueur...`);
    }
  };

  return (
    <div className="text-text flex h-full flex-col p-5 text-center">
      <h1 className="text-base font-bold self-center">
        Création du joueur...{" "}
      </h1>
      <div className="flex flex-row self-center">
        <h1 className="text-base font-bold self-center">Prénom : </h1>
        <input
          className="h-8 m-2 text-base border-text border-2 text-black"
          type="text"
          value={first}
          onChange={(e) => setFirst(e.target.value)}
          placeholder="..."
        ></input>
      </div>
      <div className="flex flex-row self-center">
        <h1 className="text-base font-bold self-center">Nom : </h1>
        <input
          className="h-8 m-2 text-base border-text border-2 text-black"
          type="text"
          value={last}
          onChange={(e) => setLast(e.target.value)}
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
