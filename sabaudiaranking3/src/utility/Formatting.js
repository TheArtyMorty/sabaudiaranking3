import Globals from "./Globals";

export const GetBackgroundColor = () => {
  switch (Globals.Theme) {
    case "Orange":
      return "bg-orange-300";
    case "Bleu":
    default:
      return "bg-blue-300";
  }
};

export const GetThemeColor = () => {
  switch (Globals.Theme) {
    case "Orange":
      return "bg-orange-700";
    case "Bleu":
    default:
      return "bg-blue-700";
  }
};

export const GetThemeColor2 = () => {
  switch (Globals.Theme) {
    case "Orange":
      return "bg-orange-200 ";
    case "Bleu":
    default:
      return "bg-blue-200 ";
  }
};
