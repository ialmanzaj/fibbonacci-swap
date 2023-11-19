import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Buying } from "../home/Buying";
import { Selling } from "../home/Selling";
import SwapInput from "../main/SwapInput";

const Swap = ({ data, isSelling, setIsSelling }: any) => {
  console.debug(data);
  return (
    <main className="relative my-auto justify-center w-full px-5 flex flex-col items-center">
      <div className="relative flex flex-col gap-5 mb-10">
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
        {isSelling ? <Selling data={data} /> : <Buying data={data} />}
      </div>
    </main>
  );
};

export default Swap;
