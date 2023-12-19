import { useNavigate } from "react-router-dom";
import {
  GetButtonStyle,
  GetContainerStyle,
  GetInputStyle,
  GetTextStyle,
} from "../utility/Formatting";
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
    <div className={GetContainerStyle("page")}>
      <div className={GetContainerStyle("horizontal")}>
        <h1 className={GetTextStyle("")}>Pseudo : </h1>
        <input
          className={GetInputStyle("")}
          type="text"
          value={pseudo}
          onChange={(e) => setPseudo(e.target.value)}
          placeholder="..."
        ></input>
      </div>
      <button className={GetButtonStyle()} onClick={createPlayer}>
        Ajouter le joueur
      </button>
    </div>
  );
};

export default AddPlayer;
