import React from "react";

function SwapButtons({ isSelling, setIsSelling }: { isSelling: boolean; setIsSelling: any }) {
  return (
    <ul className="menu w-full  bg-[#18181B]  menu-horizontal  text-white font-bold rounded-lg">
      <li className=" w-1/2">
        <button
          disabled={!isSelling}
          onClick={() => setIsSelling(!isSelling)}
          className={`${!isSelling ? "bg-indigo-800 cursor-default" : "bg-auto"} w-full  flex justify-center`}
        >
          Compra
        </button>
      </li>

      <li className="w-1/2">
        <button
          disabled={isSelling}
          onClick={() => setIsSelling(!isSelling)}
          className={`${
            isSelling ? "bg-indigo-800 cursor-default" : "bg-auto cursor-pointer"
          } w-full   flex justify-center`}
        >
          Vende
        </button>
      </li>
    </ul>
  );
}

export { SwapButtons };
