import { useState } from "react";

export const PlayerStat = ({ statNumber, statName, statDescription, size }) => {
  const [tapped, setTapped] = useState(false);
  return (
    <div
      onClick={() => setTapped(!tapped)}
      className={`flex flex-col text-black justify-center bg-white m-1 mt-2 border-2 border-black ${size}`}
    >
      {!tapped && (
        <h1 className=" text-lg font-normal text-black mt-1 ml-1 mr-1">
          {statName}
        </h1>
      )}
      {!tapped && (
        <h1 className="text-xl font-bold text-black mb-1">{statNumber}</h1>
      )}
      {tapped && (
        <h1 className=" text-sm font-normal text-black flex-wrap whitespace-break-spaces">
          {statDescription}
        </h1>
      )}
    </div>
  );
};
