import { useNavigate } from "react-router-dom";
import { GetThemeColor } from "../utility/Formatting";
import { addPlayer } from "../services/FirebaseService";
import { toast } from "react-toastify";
import { useState } from "react";

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
    <div className="flex h-full flex-col m-5 text-center">
      <div className="flex flex-row self-center">
        <h1 className="text-base font-bold self-center">Pseudo : </h1>
        <input
          className="h-8 m-2 text-base"
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="..."
        ></input>
      </div>
      <button
        className={GetThemeColor() + " text-base text-white m-5"}
        onClick={createPlayer}
      >
        Ajouter le joueur
      </button>
      <button
        className={GetThemeColor() + " text-base text-white m-1 mb-5 mt-auto"}
        onClick={() => navigate(-1)}
      >
        Retour
      </button>
    </div>
  );
};

export default AddPlayer;
