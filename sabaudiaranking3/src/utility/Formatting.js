import Globals from "./Globals";

const getBackgroundColor = () => {
  switch (Globals.Theme) {
    case "Orange":
      return "bg-orange-300";
    case "Bleu":
    default:
      return "bg-blue-300";
  }
};

const getThemeColor = () => {
  switch (Globals.Theme) {
    case "Orange":
      return "bg-orange-700";
    case "Bleu":
    default:
      return "bg-blue-700";
  }
};

const getThemeColor2 = () => {
  switch (Globals.Theme) {
    case "Orange":
      return "bg-orange-200 ";
    case "Bleu":
    default:
      return "bg-blue-200 ";
  }
};

export const GetButtonStyle = () => {
  return getThemeColor() + " text-base text-white m-1";
};

export const GetTextStyle = (style) => {
  switch (style.toLocaleLowerCase()) {
    case "bold":
      return "text-base font-bold";
    case "title":
      return "text-xl font-bold";
    case "subtitle":
      return "text-lg font-bold";
    case "score":
      return "text-lg font-bold bg-white m-4";
    default:
      return "text-base";
  }
};

export const GetContainerStyle = (style) => {
  switch (style.toLocaleLowerCase()) {
    case "main":
      return (
        getBackgroundColor() + " flex justify-center flex-col h-screen w-screen"
      );
    case "page":
      return "flex flex-col m-3";
    case "scrolllist":
      return "flex flex-col bg-white content-start divide-y overflow-y-scroll space-y-1";
    case "horizontal":
      return "flex flex-row content-start";
    case "listitem":
      return getThemeColor2() + " flex flex-row content-start";
    case "subcontainer":
      return "flex flex-col content-start bg-white bg-opacity-25 m-4 items-center";
    case "vertical":
    default:
      return "flex flex-col content-start";
  }
};

export const GetImageStyle = (style) => {
  switch (style.toLocaleLowerCase()) {
    case "icon":
    default:
      return "h-8 w-8 m-2";
  }
};

export const GetInputStyle = (style) => {
  switch (style.toLocaleLowerCase()) {
    case "score":
      return "h-8 m-2 text-base w-8";
    default:
      return "h-8 m-2 text-base";
  }
};

export const GetSelectStyle = (style) => {
  switch (style.toLocaleLowerCase()) {
    case "player":
      return "flex-1 text-base  w-52";
    default:
      return "flex-1 text-base";
  }
};
