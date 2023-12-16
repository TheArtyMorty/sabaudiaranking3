export const GetButtonStyle = () => {
  return "text-base bg-blue-700 text-white m-1";
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
      return "bg-blue-300 flex flex-col h-screen w-screen";
    case "page":
      return "flex flex-col content-start h-5/6";
    case "scrolllist":
      return "flex flex-col bg-white m-1 divide-y overflow-y-scroll flex-1 space-y-1";
    case "horizontal":
      return "flex flex-row content-start";
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
    default:
      return "h-8 m-2 text-base";
  }
};
