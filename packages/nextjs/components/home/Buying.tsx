import React, { use, useEffect, useState } from "react";
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

function Buying({ data }: any) {
  const [value, setValue] = useState<number | null>(null);
  const [exchangedValue, setExchangedValue] = useState(0);
  useEffect(() => {
    if (value) {
      setExchangedValue(value / 4200);
    }
  }, [value]);

  return (
    <form>
      <div className="dark:bg-form-gradient rounded-[20px] bg-light-form-gradient">
        <SwapInput
          token={Cop}
          value={value as number}
          setValue={setValue}
          handleOnChange={e => setValue(e.target.value)}
          data={data}
        />
        <SwapInput isLocked token={UsdtToken} value={exchangedValue} data={data} />
      </div>
      <div className="text-sm leading-4 w-full">
        <button className="text-sm py-5 px-4 rounded-lg  focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent">
          Vender
        </button>
      </div>
    </form>
  );
}

export { Buying };
