import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SwapInput from "../main/SwapInput";

const UsdtToken = {
  name: "USDT",
  symbol: "https://cdn.via.exchange/tokens/USDT.svg",
};

const Cop = {
  name: "COP",
  symbol: "https://wise.com/web-art/assets/flags/cop.svg",
  forex: true,
};

const Swap = ({ value, exchangeValue, data, handleChange, setValue, isSelling, setIsSelling }: any) => {
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
        {isSelling ? (
          <>
            <div className="dark:bg-form-gradient rounded-[20px] bg-light-form-gradient">
              <SwapInput
                token={UsdtToken}
                setValue={setValue}
                value={value}
                handleOnChange={handleChange}
                data={data}
              />
              <SwapInput token={Cop} isLocked setValue={setValue ? setValue : null} value={exchangeValue} data={data} />
            </div>
            <div className="text-sm leading-4 w-full">
              <Link
                href="/"
                type="a"
                className="text-sm py-5 px-4 rounded-lg  focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent"
              >
                Vender
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="dark:bg-form-gradient rounded-[20px] bg-light-form-gradient">
              <SwapInput token={Cop} value={value} setValue={setValue} handleOnChange={handleChange} data={data} />
              <SwapInput isLocked token={UsdtToken} value={exchangeValue} data={data} />
            </div>
            <div className="text-sm leading-4 w-full">
              <Link
                href="/"
                type="a"
                className="text-sm py-5 px-4 rounded-lg  focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent"
              >
                Vender
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default Swap;
