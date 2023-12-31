import React from "react";
import { Currency } from "../currencies";
import Token from "./Token";
import { BigNumber } from "ethers";

function SwapInput({
  amount,
  handleOnChange,
  balance,
  isLocked,
  setValue,
  currency,
}: {
  amount?: BigNumber;
  balance?: BigNumber;
  handleOnChange?: any;
  isLocked?: boolean;
  setValue?: any;
  currency: Currency;
}) {
  return (
    <div className="relative flex justify-between w-full  p-1.5 transition-all  rounded-[20px] border h-[131px] px-4 py-6 md:p-6 items-center dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B]">
      <div className="flex justify-between overflow-hidden w-full">
        <div className="flex flex-col w-full justify-between">
          <div className="">
            <p className="m-0 text-white">{isLocked ? "Tú recibes" : "Tú envías"}</p>
          </div>
          <input
            disabled={isLocked}
            className=" enabled:text-white disabled:text-slate-400 h-12 w-48 bg-transparent p-2 text-2xl outline-none placeholder:text-black-400 placeholder:text-opacity-100 dark:placeholder:text-white-400 md:w-60 !w-full !font-semibold !text-[28px] !pl-0"
            inputMode="decimal"
            title="Token Amount"
            autoComplete="off"
            autoCorrect="off"
            type="number"
            value={amount}
            pattern="^[0-9]*[.,]?[0-9]*$"
            onChange={handleOnChange ? handleOnChange : () => {}}
            placeholder="0"
            minLength={1}
            maxLength={79}
            spellCheck="false"
            data-testid="input-base-tokens-amount"
            defaultValue=""
          />
        </div>
        <div className="flex min-w-max flex-col items-end justify-between gap-4 text-left overflow-hidden">
          <Token name={currency.symbol} icon={currency.icon} />
          <span className="text-sm dark:text-white-400 leading-none text-[#9ca3af]">
            <span className="dark:text-white/80 text-[#141418CC] font-semibold"></span>
            {!isLocked && !currency.forex && (
              <button
                type="button"
                onClick={() => balance && setValue && setValue((balance / BigInt(10 ** 18))?.toString())}
                className="test-sm ml-1 rounded-lg px-1 leading-none uppercase"
              >
                <span className="text-gray-500 font-light">
                  {balance ? (balance / BigInt(10 ** 18))?.toString() : "Loading.."}
                </span>{" "}
                Max
              </button>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default SwapInput;
