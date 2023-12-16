import { useState } from "react";
import { GetPlayerListFromDB } from "../services/FirebaseService";
import searchLogo from "../assets/IconSearch.png";
import {
  GetContainerStyle,
  GetImageStyle,
  GetInputStyle,
  GetTextStyle,
} from "../utility/Formatting";
import { useNavigate } from "react-router-dom";

const Ranking = () => {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFilter(e.target.value);
  };

  if (!dbInitialized) {
    GetPlayerListFromDB(setPlayerList);
    setDBInitialized(true);
  }

  const GetPlayerList = () => {
    return playerList
      .sort((a, b) => b.MMR - a.MMR)
      .map((p, index) => {
        var newPlayer = p;
        newPlayer.Rank = index + 1;
        return newPlayer;
      })
      .filter(
        (a) =>
          a.Pseudo.toLocaleUpperCase().indexOf(filter.toLocaleUpperCase()) >= 0
      )
      .map((p, index) => {
        return (
          <div
            className={GetContainerStyle("horizontal") + " bg-blue-200"}
            key={index}
            onTouchEnd={() => navigate("/sabaudiaranking3/player/" + p.ID)}
          >
            <h1 className={GetTextStyle("bold")}>#{p.Rank} -</h1>
            <h1 className={GetTextStyle("default")}>
              {p.Pseudo} - {p.MMR} Pts
            </h1>
          </div>
        );
      });
  };

  return (
    <div className={GetContainerStyle("page")}>
      <h1 className={GetTextStyle("subtitle")}>Classement : </h1>
      <div className={GetContainerStyle("horizontal") + " items-center"}>
        <img src={searchLogo} className={GetImageStyle("icon")}></img>
        <input
          className={GetInputStyle("")}
          type="text"
          value={filter}
          onChange={handleChange}
          placeholder="..."
        />
      </div>
      <div className={GetContainerStyle("scrolllist")}>{GetPlayerList()}</div>
    </div>
  );
};

export default Ranking;
