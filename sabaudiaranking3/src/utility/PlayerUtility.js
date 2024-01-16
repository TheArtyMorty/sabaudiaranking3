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
