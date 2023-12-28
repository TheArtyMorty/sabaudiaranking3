import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetGameFromDB } from "../services/FirebaseService";
import { GetThemeColor } from "../utility/Formatting";
import { GetDateFromString } from "../utility/Utility";

const Game = ({ setTransitionDirection }) => {
	const { gameID } = useParams();
	const navigate = useNavigate();
	const [dbInitialized, setDBInitialized] = useState(false);
	const [game, setGame] = useState({
		Date: "",
		Victory: "",
		Scores: {
			Set1: { A: "-", B: "-" },
			Set2: { A: "-", B: "-" },
			Set3: { A: "-", B: "-" },
		},
		TeamA: { player1: { Pseudo: "..." }, player2: { Pseudo: "..." } },
		TeamB: { player1: { Pseudo: "..." }, player2: { Pseudo: "..." } },
		Gain: 0,
		ID: "",
	});

	if (!dbInitialized) {
		GetGameFromDB(gameID, setGame);
		setDBInitialized(true);
	}

	const handleGetBackClick = () => {
		setTransitionDirection("left-to-right");
		navigate(-1);
	};

	return (
		<div className="flex h-full flex-col ml-5 mr-5">
			<div className="flex flex-col content-start bg-white bg-opacity-25 mt-5 items-center">
				<h1 className="text-base font-bold">Equipe A</h1>
				<div className="flex flex-row mb-2 mt-2">
					<h1 className="text-base mr-2">Joueur 1 : </h1>
					<h1 className="text-base italic">
						{game.TeamA.player1.Pseudo} {"("}
						{game.TeamA.player1.MMR}
						{" pts)"}
					</h1>
				</div>
				<div className="flex flex-row mb-2">
					<h1 className="text-base mr-2">Joueur 2 : </h1>
					<h1 className="text-base italic">
						{game.TeamA.player2.Pseudo} {"("}
						{game.TeamA.player2.MMR}
						{" pts)"}
					</h1>
				</div>
			</div>

			<div className="flex flex-col content-start bg-white bg-opacity-25 mt-5 items-center">
				<div className="flex flex-row">
					<h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
						{game.Scores.Set1.A}
					</h1>
					<h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
						{game.Scores.Set2.A}
					</h1>
					<h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
						{game.Scores.Set3.A}
					</h1>
				</div>
				<div className="flex flex-row">
					<h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
						{game.Scores.Set1.B}
					</h1>
					<h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
						{game.Scores.Set2.B}
					</h1>
					<h1 className="w-8 h-8 text-lg font-bold bg-white m-4 text-center">
						{game.Scores.Set3.B}
					</h1>
				</div>
			</div>

			<div className="flex flex-col content-start bg-white bg-opacity-25 mt-5 items-center">
				<h1 className="text-base font-bold">Equipe B</h1>
				<div className="flex flex-row mb-2 mt-2">
					<h1 className="text-base mr-2">Joueur 1 : </h1>
					<h1 className="text-base italic">
						{game.TeamB.player1.Pseudo} {"("}
						{game.TeamB.player1.MMR}
						{" pts)"}
					</h1>
				</div>
				<div className="flex flex-row mb-2">
					<h1 className="text-base mr-2">Joueur 2 : </h1>
					<h1 className="text-base italic">
						{game.TeamB.player2.Pseudo} {"("}
						{game.TeamB.player2.MMR}
						{" pts)"}
					</h1>
				</div>
			</div>

			<div className="flex flex-col content-start bg-white bg-opacity-25 mt-5 items-center">
				<h1 className="text-base font-bold">Résultat :</h1>
				<h1 className="text-base mb-1 mt-1">
					{GetDateFromString(game.Date).toLocaleString()}
				</h1>
				<h1 className="text-base mb-1">
					{"Victoire de l'équipe "} {game.Victory}{" "}
				</h1>
				<h1 className="text-base mb-2">
					Gain de {game.Gain != undefined ? game.Gain : " -?- "}
					{" points"}
				</h1>
			</div>

			<button
				className={GetThemeColor() + " text-base text-white m-1 mb-5 mt-auto"}
				onClick={handleGetBackClick}
			>
				Retour
			</button>
		</div>
	);
};

export default Game;
