import { ref, set, child, push, update, onValue } from "firebase/database";
import { db } from "../firebaseConfig.js";
import Globals from "./Globals.js";

export const addPlayer = (lastName, firstName, pseudo) => {
  const newItemKey = push(child(ref(db), Globals.ClubName + "/players")).key;
  const itemData = {
    LastName: lastName,
    FirstName: firstName,
    Pseudo: pseudo,
    MMR: 1000,
    Key: newItemKey,
  };
  const updates = {};
  updates[Globals.ClubName + "/players/" + newItemKey] = itemData;

  update(ref(db), updates);
};

export const updatePlayerMMR = (playerKey, newMMR) => {
  set(ref(db, Globals.ClubName + "/players/" + playerKey + "/MMR"), newMMR);
};

export const addScore = (
  player1,
  player2,
  player3,
  player4,
  winner,
  mmrGain,
  A1,
  A2,
  A3,
  B1,
  B2,
  B3
) => {
  const newItemKey = push(child(ref(db), Globals.ClubName + "/games")).key;

  const itemData = {
    TeamA: { player1: player1, player2: player2 },
    TeamB: { player1: player3, player2: player4 },
    Victory: winner,
    Scores: {
      Set1: { A: A1, B: B1 },
      Set2: { A: A2, B: B2 },
      Set3: { A: A3, B: B3 },
    },
    Date: new Date().toLocaleString(),
    Gain: mmrGain,
    Key: newItemKey,
  };

  const updates = {};
  updates[Globals.ClubName + "/games/" + newItemKey] = itemData;

  update(ref(db), updates);
};

export const GetPlayerListFromDB = (setPlayerList) => {
  const playersRef = ref(db, Globals.ClubName + "/players/");
  onValue(playersRef, (snapshot) => {
    const data = snapshot.val();
    let playerList = [];
    Object.values(data).forEach((player) => {
      playerList.push({
        FirstName: player.FirstName,
        LastName: player.LastName,
        MMR: player.MMR,
        ID: player.Key,
        Pseudo: player.Pseudo,
        Rank: 0,
      });
    });
    setPlayerList(playerList);
  });
};
