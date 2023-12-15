import { useState } from "react";
import { GetPlayerListFromDB } from "../services/FirebaseService";

const Ranking = () => {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [playerList, setPlayerList] = useState([]);

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
      .map((p, index) => {
        return (
          <div className="flex flex-row content-start" key={index}>
            <h1 className="text-base">#{p.Rank} -</h1>
            <h1 className="text-base">{p.Pseudo}</h1>
            <h1 className="text-base"> - {p.MMR} Pts</h1>
          </div>
        );
      });
  };

  return (
    <div className="flex flex-col content-center text-base">
      <h1 className="text-lg">Classement : </h1>
      <div className=" max-h-screen container bg-blue-200 divide-y overflow-y-scroll">
        {GetPlayerList()}
      </div>
    </div>
  );
};

export default Ranking;
