import "./App.css";
import "./App.css";

import { useState } from "react";
import {
	BrowserRouter,
	Navigate,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import AddPlayer from "./components/AddPlayer";
import Club from "./components/Club";
import Game from "./components/Game";
import Home from "./components/Home";
import Options from "./components/Options";
import Player from "./components/Player";
import Ranking from "./components/Ranking";
import Scoring from "./components/Scoring";
import { GetBackgroundColor } from "./utility/Formatting";
import Globals from "./utility/Globals";
import { getAdmin, getClub, getPlayer, getTheme } from "./utility/LocalService";

function App() {
	const club = getClub();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [needRefresh, setNeedRefresh] = useState(true);
	const [transitionDirection, setTransitionDirection] =
		useState("right-to-left");
	const location = useLocation();

	if (club != undefined && club != "" && !isLoggedIn) {
		setIsLoggedIn(true);
	}

	if (needRefresh) {
		Globals.ClubName = getClub();
		Globals.Admin = getAdmin();
		Globals.Player = getPlayer();
		Globals.Theme = getTheme();
		setNeedRefresh(false);
	}

	const logIn = () => setIsLoggedIn(true);
	const logOut = () => setIsLoggedIn(false);

	const getLoadingPage = () => {
		if (isLoggedIn) {
			return <Home setTransitionDirection={setTransitionDirection} />;
		} else {
			return <Navigate to="/sabaudiaranking3/club" />;
		}
	};

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={location.key}
				classNames={transitionDirection}
				timeout={300}
			>
				<Routes location={location}>
					<Route path="/sabaudiaranking3" element={getLoadingPage()} />
					<Route
						path="/sabaudiaranking3/player/:playerID"
						element={<Player />}
					/>
					<Route
						path="/sabaudiaranking3/games/:gameID"
						element={<Game setTransitionDirection={setTransitionDirection} />}
					/>
					<Route
						path="/sabaudiaranking3/classement"
						element={
							<Ranking setTransitionDirection={setTransitionDirection} />
						}
					/>
					<Route
						path="/sabaudiaranking3/scoring"
						element={
							<Scoring setTransitionDirection={setTransitionDirection} />
						}
					/>
					<Route path="/sabaudiaranking3/addPlayer" element={<AddPlayer />} />
					<Route
						path="/sabaudiaranking3/club"
						element={<Club login={logIn} />}
					/>
					<Route
						path="/sabaudiaranking3/options"
						element={
							<Options
								logout={logOut}
								refresh={setNeedRefresh}
								setTransitionDirection={setTransitionDirection}
							/>
						}
					/>
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
}

const Root = () => (
	<div id="root" className={GetBackgroundColor() + " h-screen w-screen"}>
		<BrowserRouter>
			<App />{" "}
		</BrowserRouter>
		<ToastContainer />
	</div>
);

export default Root;
