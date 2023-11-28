import React, { useEffect, useState } from "react";
import { COP, USDT } from "../currencies";
import SwapInput from "../main/SwapInput";
import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

function Buying({ orders }: any) {
  const { address: connectedAddress } = useAccount();

  const { data: balanceBallons } = useScaffoldContractRead({
    contractName: "Balloons",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  const [amountIn, setAmountIn] = useState<number | null>(null);
  const [exchangedAmount, setExchangedValue] = useState(0);
  useEffect(() => {
    if (amountIn) {
      setExchangedValue(amountIn / 4200);
    }
  }, [amountIn]);

  return (
    <section>
      <div className="dark:bg-form-gradient rounded-[20px] bg-light-form-gradient">
        <SwapInput
          currency={COP}
          amount={amountIn as number}
          setValue={setAmountIn}
          handleOnChange={e => setAmountIn(e.target.value)}
          balance={balanceBallons}
        />
        <SwapInput isLocked currency={USDT} amount={exchangedAmount} balance={balanceBallons} />
      </div>
      <div className="text-sm leading-4 w-full">
        <button className="text-sm py-5 px-4 rounded-lg  focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent">
          Comprar
        </button>
      </div>
    </section>
  );
}

export { Buying };
