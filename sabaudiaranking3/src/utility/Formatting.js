import Globals from "./Globals";

export const GetBackgroundColor = () => {
	switch (Globals.Theme) {
		case "Orange":
			return "bg-orange-300";
		case "Bleu":
		default:
			return "bg-cyan-300";
	}
};

export const GetThemeColor = () => {
	switch (Globals.Theme) {
		case "Orange":
			return "bg-orange-700 text-orange-100 uppercase font-bold";
		case "Bleu":
		default:
			return "bg-cyan-700 text-cyan-100 uppercase font-bold shadow-lg shadow-cyan-500/50";
	}
};

export const GetThemeColor2 = () => {
	switch (Globals.Theme) {
		case "Orange":
			return "bg-orange-300 ";
		case "Bleu":
		default:
			return "bg-cyan-300 ";
	}
};
