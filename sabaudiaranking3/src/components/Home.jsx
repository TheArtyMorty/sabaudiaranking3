import { useNavigate } from "react-router-dom";
import { GetThemeColor } from "../utility/Formatting";
import Globals from "../utility/Globals";
import logo from "../assets/icon.png";

const Home = () => {
	const navigate = useNavigate();
	const GoToScoringPage = (e) => {
		e.preventDefault();
		navigate("/sabaudiaranking3/scoring");
	};
	const GoToRankingPage = (e) => {
		e.preventDefault();
		navigate("/sabaudiaranking3/classement");
	};
	const GoToOptionsPage = (e) => {
		e.preventDefault();
		navigate("/sabaudiaranking3/options");
	};
	const GoToMyPage = (e) => {
		e.preventDefault();
		navigate("/sabaudiaranking3/player/" + Globals.Player);
	};

	return (
		<div className="flex h-full flex-col m-5 text-center justify-center">
			<h1 className="text-xl font-bold text-cyan-800">Bienvenue sur</h1>
			<h1 className="title-xl font-bold text-cyan-800">Sabaudia Ranking</h1>
			<img src={logo} className=" h-36 w-36 m-5 mb-10 self-center"></img>
			{Globals.Player != undefined && Globals.Player != "" && (
				<button
					className={GetThemeColor() + " text-base text-white m-1 mb-5"}
					onClick={GoToMyPage}
				>
					Ma page
				</button>
			)}
			<button
				className={GetThemeColor() + " text-base text-white m-1 mb-5"}
				onClick={GoToScoringPage}
			>
				Ajouter un score
			</button>
			<button
				className={GetThemeColor() + " text-base text-white m-1 mb-5"}
				onClick={GoToRankingPage}
			>
				Classement
			</button>
			<button
				className={GetThemeColor() + " text-base text-white m-1 mb-5"}
				onClick={GoToOptionsPage}
			>
				Options
			</button>
		</div>
	);
};

export default Home;
