import Globals from "./Globals";

export const GetBackgroundColor = () => {
  switch (Globals.Theme) {
    case "Dark":
      return "bg-red-900 ";
    case "Light":
    default:
      return "bg-white ";
  }
};

export const GetButtonTheme = () => {
  switch (Globals.Theme) {
    case "Dark":
      return "bg-white text-red-800 uppercase font-bold shadow-lg shadow-red-500/50";
    case "Light":
    default:
      return "bg-red-800 text-white uppercase font-bold shadow-lg shadow-red-500/50";
  }
};

export const GetThemeColor2 = () => {
  switch (Globals.Theme) {
    case "Dark":
      return "bg-red-800 bg-opacity-50 ";
    case "Light":
    default:
      return "bg-red-800 bg-opacity-25 ";
  }
};
