import { useState } from "react";
import { getClubsFromDB } from "../services/FirebaseService.js";
import { GetThemeColor } from "../utility/Formatting.js";
import Select from "react-select";
import { toast } from "react-toastify";
import Globals from "../utility/Globals.js";
import { storeAdmin, storeClub } from "../utility/LocalService.js";
import { useNavigate } from "react-router-dom";

const Club = ({ login }) => {
  const [dbInitialized, setDBInitialized] = useState(false);
  const [clubList, setClubList] = useState([]);
  const navigate = useNavigate();

  if (!dbInitialized) {
    getClubsFromDB(setClubList);
    setDBInitialized(true);
  }

  const GetClubList = () => {
    return clubList.map((c) => {
      return { value: c, label: c.Name };
    });
  };

  const [club, setclub] = useState({
    Name: "...",
    pwd: "...",
    adminpwd: "...",
  });
  const [pwd, setpwd] = useState("");
  const [clubChosen, setclubChosen] = useState(false);
  let navigateBackTriggered = false;

  const NavigateBackIfClubValid = () => {
    if (!clubChosen) {
      toast.warning("Selectionnez le club...");
    } else {
      if (pwd == club.pwd) {
        storeAdmin("false");
        storeClub(club.Name);
        Globals.ClubName = club.Name;
        Globals.Admin = false;
        navigateBackTriggered = true;
        login();
        navigate("/sabaudiaranking3/");
        return true;
      } else if (pwd == club.adminpwd) {
        storeAdmin("true");
        storeClub(club.Name);
        Globals.ClubName = club.Name;
        Globals.Admin = true;
        navigateBackTriggered = true;
        login();
        navigate("/sabaudiaranking3/");
        return true;
      } else {
        toast.error("Mot de passe erroné...");
      }
    }
    storeClub("");
    storeAdmin("false");
    return false;
  };

  const ChooseAClub = (e) => {
    const club = e.value;
    if (club.Name != "...") {
      setclub(club);
      setclubChosen(true);
    } else {
      setclub(club);
      setclubChosen(false);
    }
  };

  const ChangePwd = (e) => {
    setpwd(e.target.value);
  };

  /*React.useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (navigateBackTriggered) {
          navigation.dispatch(e.data.action);
        }
        e.preventDefault();
        NavigateBackIfClubValid();
      }),
    [navigation, club, clubChosen, pwd, navigateBackTriggered]
  );*/

  return (
    <div className="flex h-full flex-col m-5 text-center">
      <h1 className="text-lg font-bold">Choisissez votre club : </h1>
      <Select
        className="text-base w-52 self-center mb-5"
        defaultValue={club}
        onChange={ChooseAClub}
        options={GetClubList()}
      ></Select>
      <h1 className="text-base font-bold italic">Mot de passe : </h1>
      <input
        className="h-8 mb-5 text-base"
        type="text"
        value={pwd}
        onChange={ChangePwd}
        placeholder="password..."
      ></input>
      <button
        className={GetThemeColor() + " text-base text-white m-1 mb-5"}
        onClick={NavigateBackIfClubValid}
      >
        Valider
      </button>
    </div>
  );
};

export default Club;
