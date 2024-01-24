export const defaultPlayer = {
  FirstName: "",
  LastName: "",
  MMR: 0,
  Pseudo: "...",
  Key: "",
  Rank: 0,
};

export const GetPseudoOrDefaultForPlayer = (player) => {
  if (player.Pseudo != "") {
    return player.Pseudo;
  } else {
    return player.FirstName + " " + player.LastName;
  }
};

export const GetPlayerMMRForRanking = (player) => {
  if (player.HasPlayedaGame) {
    return player.MMR;
  }
  return 0;
};
