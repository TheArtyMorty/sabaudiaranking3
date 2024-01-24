import { useNavigate } from "react-router-dom";

import logo from "../assets/icon.png";
import { GetButtonTheme } from "../utility/Formatting";
import Globals from "../utility/Globals";
import {
  GetGamesHistoryFromDB,
  GetPlayerListFromDB,
  addPlayer,
  updatePlayerHasPlayerAGame,
} from "../services/FirebaseService";
import { useState } from "react";

const Home = ({ setTransitionDirection }) => {
  const navigate = useNavigate();
  const GoToScoringPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/scoring");
  };
  const GoToRankingPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/classement");
  };
  const GoToOptionsPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/options");
  };
  const GoToMyPage = (e) => {
    e.preventDefault();
    setTransitionDirection("right-to-left");
    navigate("/sabaudiaranking3/player/" + Globals.Player);
  };

  var isLogged = Globals.UserId != "";

  const DoSomething = () => {
    UpdatePlayedAGame();
  };

  return (
    <div
      className={
        "text-text flex h-full flex-col p-5 text-center justify-center"
      }
    >
      <h1 className="text-xl">Bienvenue sur</h1>
      <h1 className="text-primary title-xl font-bold mb-10">
        Sabaudia Ranking
      </h1>
      <img
        src={logo}
        className="fill-orange-500 text-secondary h-36 w-36 m-5 self-center animate-bounce-slow"
      ></img>
      {Globals.Player != undefined && Globals.Player != "" && isLogged && (
        <button className={GetButtonTheme() + " m-1 mb-5"} onClick={GoToMyPage}>
          Ma page
        </button>
      )}
      {isLogged && (
        <button
          className={GetButtonTheme() + " m-1 mb-5"}
          onClick={GoToScoringPage}
        >
          Ajouter un score
        </button>
      )}
      {isLogged && (
        <button
          className={GetButtonTheme() + " m-1 mb-5"}
          onClick={GoToRankingPage}
        >
          Classement
        </button>
      )}
      {isLogged && (
        <button
          className={GetButtonTheme() + " m-1 mb-5"}
          onClick={GoToOptionsPage}
        >
          Options
        </button>
      )}
      {!isLogged && (
        <button
          className={GetButtonTheme() + " m-1 mb-5"}
          onClick={() => {
            setTransitionDirection("right-to-left");
            navigate("/sabaudiaranking3/login");
          }}
        >
          Connexion
        </button>
      )}

      {false && (
        <button
          className={GetButtonTheme() + " m-1 mb-5"}
          onClick={DoSomething}
        >
          Do Something
        </button>
      )}
    </div>
  );
};

export default Home;

const ClubReset = () => {
  /*var users = [
    { first: "Alexia", last: "E" },
    { first: "Patricia", last: "B" },
    { first: "Jerome", last: "D" },
    { first: "Lucas", last: "P" },
    { first: "Thibaut", last: "V" },
    { first: "Nouredine", last: "M" },
    { first: "Damien", last: "H" },
    { first: "Benjamin", last: "D" },
    { first: "Ludivine", last: "C" },
    { first: "Aurore", last: "A" },
    { first: "Frederic", last: "R" },
    { first: "Nicolas", last: "M" },
    { first: "Franck", last: "B" },
    { first: "Aurélie", last: "M" },
    { first: "Virginie", last: "C" },
    { first: "Mickaël", last: "B" },
    { first: "Valérie", last: "G" },
    { first: "Maxime", last: "F" },
    { first: "Sebastien", last: "P" },
    { first: "Manon", last: "M" },
    { first: "Cyril", last: "Q" },
    { first: "Gregoire", last: "D" },
    { first: "Kévin", last: "S" },
    { first: "Theotime", last: "G" },
    { first: "Ornella", last: "S" },
    { first: "Thibault", last: "B" },
    { first: "Priscilla", last: "W" },
    { first: "Bernard", last: "J" },
    { first: "Laura", last: "F" },
    { first: "Christiane", last: "G" },
    { first: "Kevin", last: "D" },
    { first: "Frédéric", last: "B" },
    { first: "Charlotte", last: "P" },
    { first: "Alizee", last: "P" },
    { first: "Rémi", last: "M" },
    { first: "Alexia", last: "F" },
    { first: "Arnaud", last: "N" },
    { first: "Julien", last: "F" },
    { first: "Frédéric", last: "V" },
    { first: "Sebastien", last: "C" },
    { first: "Erika", last: "W" },
    { first: "Jonathan", last: "M" },
    { first: "Lionel", last: "B" },
    { first: "Chloe", last: "LDS" },
    { first: "Jeremy", last: "L" },
    { first: "Valentine", last: "A" },
    { first: "Olivier", last: "B" },
    { first: "Damien", last: "B" },
    { first: "Laurent", last: "B" },
    { first: "Benjamin", last: "C" },
    { first: "Clement", last: "C" },
    { first: "Maxime", last: "D" },
    { first: "Mathieu", last: "D" },
    { first: "William", last: "G" },
    { first: "Thibault", last: "L" },
    { first: "Christophe", last: "L" },
    { first: "Melanie", last: "M" },
    { first: "Pascal", last: "M" },
    { first: "Steve", last: "M" },
    { first: "Thomas", last: "M" },
    { first: "Godefroy", last: "PDC" },
    { first: "Noemie", last: "P" },
    { first: "Nathan", last: "Q" },
    { first: "Isabelle", last: "R" },
    { first: "Andrea", last: "S" },
    { first: "Laurie", last: "S" },
    { first: "Arnaud", last: "V" },
  ];
  Globals.ClubName = "ASPTT-74";
  for (const user of users) {
    addPlayer(user.last, user.first, "");
  }*/
};

export const UpdatePlayedAGame = () => {
  //We disable all
  /*GetPlayerListFromDB((playerList) => {
    playerList.forEach((player) => {
      updatePlayerHasPlayerAGame(player.Key, false);
    });
  });*/
  // we update those who played
  GetGamesHistoryFromDB((games) => {
    games.forEach((game) => {
      updatePlayerHasPlayerAGame(game.TeamA.player1.Key, true);
      updatePlayerHasPlayerAGame(game.TeamA.player2.Key, true);
      updatePlayerHasPlayerAGame(game.TeamB.player1.Key, true);
      updatePlayerHasPlayerAGame(game.TeamB.player2.Key, true);
    });
  });
};
