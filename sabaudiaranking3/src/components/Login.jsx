import { useNavigate } from "react-router-dom";
import { GetButtonTheme } from "../utility/Formatting";
import Globals from "../utility/Globals";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { useState } from "react";
import Select from "react-select";
import {
  GetPlayerListFromDB,
  addNewUser,
  getClubsFromDB,
} from "../services/FirebaseService";
import {
  GetPseudoOrDefaultForPlayer,
  defaultPlayer,
} from "../utility/PlayerUtility";
import { storeClub, storeUid } from "../utility/LocalService";

const Login = ({ refresh, setTransitionDirection }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [clubpassword, setclubPassword] = useState("");
  const [createUser, setCreateUser] = useState(false);
  const [dbInitialized, setDBInitialized] = useState(false);
  const [clubList, setClubList] = useState([]);

  if (!dbInitialized) {
    getClubsFromDB(setClubList);
    setDBInitialized(true);
  }

  const [loadUsers, setLoadUsers] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [player, setPlayer] = useState({
    value: defaultPlayer.Key,
    label: defaultPlayer.Pseudo,
  });

  const GetClubList = () => {
    return clubList.map((c) => {
      return { value: c, label: c.Name };
    });
  };

  const GetPlayerList = () => {
    return playerList
      .filter(
        (p) => p.UserId == undefined || p.UserId == null || p.UserId == "..."
      )
      .sort((a, b) =>
        GetPseudoOrDefaultForPlayer(a).localeCompare(
          GetPseudoOrDefaultForPlayer(b)
        )
      )
      .map((p) => {
        return { value: p.Key, label: GetPseudoOrDefaultForPlayer(p) };
      });
  };

  const [club, setclub] = useState({
    Name: "...",
    pwd: "...",
    adminpwd: "...",
  });

  if (loadUsers) {
    storeClub(club.Name);
    Globals.ClubName = club.Name;
    GetPlayerListFromDB(setPlayerList);
    setLoadUsers(false);
  }

  const navigateBack = () => {
    setTransitionDirection("left-to-right");
    navigate(-1);
  };

  const onCreateUser = async (isAdmin) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        addNewUser(user.uid, club.Name, player.value, isAdmin);
        storeUid(user.uid);
        refresh(true);
        navigateBack();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode + " : " + errorMessage);
        // ..
      });
  };

  const onLogIn = async () => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        storeUid(user.uid);
        refresh(true);
        navigateBack();
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(errorCode + " : " + errorMessage);
        // ..
      });
  };

  const onLoginClicked = (e) => {
    e.preventDefault();
    if (createUser) {
      if (club.Name == "...") {
        toast.error("Veuillez choisir un club !");
        return;
      }
      if (clubpassword != club.pwd && clubpassword != club.adminpwd) {
        toast.error("Mot de passe du Club incorrect !");
        return;
      }
      if (player.value == defaultPlayer.Key) {
        toast.error("Veuillez indiquer qui vous êtes...");
        return;
      }
      onCreateUser(clubpassword == club.adminpwd);
    } else {
      onLogIn();
    }
  };

  return (
    <div className="text-text flex h-full flex-col p-5 text-center">
      <div className="bg-secondary flex flex-col content-start m-2 items-center">
        <h1 className="text-lg font-bold">Page de login... </h1>
        <div>
          <label className="text-base" htmlFor="email-address">
            Email address :{" "}
          </label>
          <input
            className="text-base m-2 text-black"
            type="email"
            label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div>
          <label className="text-base" htmlFor="password">
            Password :{" "}
          </label>
          <input
            className="text-base m-2 text-black"
            type="password"
            label="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        {createUser && (
          <h1 className="text-base font-bold mt-5 mb-2">
            Quel est votre club ? :{" "}
          </h1>
        )}
        {createUser && (
          <Select
            className="text-base w-52 self-center text-black"
            defaultValue={club}
            onChange={(e) => {
              setclub(e.value);
              setLoadUsers(true);
            }}
            options={GetClubList()}
          ></Select>
        )}
        {createUser && (
          <div>
            <label className="text-base" htmlFor="password">
              Club Password :{" "}
            </label>
            <input
              className="text-base m-2 text-black"
              type="password"
              label="Create password"
              value={clubpassword}
              onChange={(e) => setclubPassword(e.target.value)}
              required
              placeholder="Club Password"
            />
          </div>
        )}

        {createUser && playerList.length > 0 && (
          <h1 className="text-base font-bold mt-5">Qui êtes vous ?</h1>
        )}

        {createUser && playerList.length > 0 && (
          <Select
            className="flex-1 text-base w-52 mt-2 mb-5 text-black"
            value={player}
            onChange={(e) => {
              setPlayer(e);
            }}
            options={GetPlayerList()}
          />
        )}

        <button
          className={GetButtonTheme() + " m-1 mt-5"}
          onClick={onLoginClicked}
        >
          {createUser ? "S'enregistrer" : "Se connecter"}
        </button>

        <div className="m-2">
          <input
            className="text-base mr-2"
            type="checkbox"
            checked={createUser}
            onChange={() => setCreateUser(!createUser)}
          />
          <label
            className="text-base"
            htmlFor="password"
            onClick={() => setCreateUser(!createUser)}
          >
            Première connexion
          </label>
        </div>
      </div>

      <button
        className={GetButtonTheme() + " m-1 mt-auto"}
        onClick={navigateBack}
      >
        Retour
      </button>
    </div>
  );
};

export default Login;
