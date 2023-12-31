import { ref, set, child, push, update, onValue } from "firebase/database";
import { db } from "../firebaseConfig.js";
import Globals from "../utility/Globals.js";

export const addPlayer = (lastName, firstName, pseudo) => {
  console.log(Globals.ClubName + "/players");
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
    Date: new Date().toUTCString(),
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
        Key: player.Key,
        Pseudo: player.Pseudo,
        Rank: 0,
      });
    });
    setPlayerList(playerList);
  });
};

export const GetPlayerFromDB = (playerID, setPlayer) => {
  const playersRef = ref(db, Globals.ClubName + "/players/");
  onValue(playersRef, (snapshot) => {
    const data = snapshot.val();
    let newData = [];
    Object.values(data).forEach((player) => {
      newData.push({
        FirstName: player.FirstName,
        LastName: player.LastName,
        Key: player.Key,
        MMR: player.MMR,
        Pseudo: player.Pseudo,
        Rank: 0,
      });
    });

    const actualPlayer = newData
      .sort((a, b) => b.MMR - a.MMR)
      .map((p, index) => {
        var newPlayer = p;
        newPlayer.Rank = index + 1;
        return newPlayer;
      })
      .find((p) => p.Key == playerID);

    setPlayer(actualPlayer);
  });
};

export const GetPlayerHistoryFromDB = (playerID, setPlayerHistory) => {
  const gamesRef = ref(db, Globals.ClubName + "/games/");
  onValue(gamesRef, (snapshot) => {
    const data = snapshot.val();
    let newData = [];
    Object.values(data).forEach((game) => {
      let newGame = {
        Date: game.Date,
        Victory: game.Victory,
        Scores: game.Scores,
        TeamA: game.TeamA,
        TeamB: game.TeamB,
        Gain: game.Gain,
        IWasOnTeam: "None",
        ID: game.Key,
      };
      if (
        game.TeamA.player1.Key == playerID ||
        game.TeamA.player2.Key == playerID
      ) {
        newGame.IWasOnTeam = "A";
      } else if (
        game.TeamB.player1.Key == playerID ||
        game.TeamB.player2.Key == playerID
      ) {
        newGame.IWasOnTeam = "B";
      }
      newData.push(newGame);
    });

    const actualPlayerGames = newData.filter((g) => {
      return g.IWasOnTeam != "None";
    });

    setPlayerHistory(actualPlayerGames);
  });
};

export const GetGameFromDB = (gameID, setGame) => {
  const gameRef = ref(db, Globals.ClubName + "/games/" + gameID);
  onValue(gameRef, (snapshot) => {
    const g = snapshot.val();
    const newGame = {
      Date: g.Date,
      Victory: g.Victory,
      Scores: g.Scores,
      TeamA: g.TeamA,
      TeamB: g.TeamB,
      Gain: g.Gain,
      ID: g.Key,
    };
    setGame(newGame);
  });
};

export const getClubsFromDB = (setClubs) => {
  const clubsRef = ref(db, "Clubs");
  onValue(clubsRef, (snapshot) => {
    const data = snapshot.val();
    let newData = [
      {
        Name: "...",
        pwd: "...",
        adminpwd: "...",
      },
    ];
    Object.values(data).forEach((club) => {
      newData.push({
        Name: club.Name,
        pwd: club.pwd,
        adminpwd: club.adminpwd,
      });
    });
    setClubs(newData);
  });
};
