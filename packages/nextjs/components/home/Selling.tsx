import React, { useEffect, useState } from "react";
import { COP, USDT } from "../currencies";
import SwapInput from "../main/SwapInput";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";
import { useDeployedContractInfo, useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { multiplyTo1e18 } from "~~/utils/scaffold-eth/priceInWei";
import { getFutureTimeInUnix } from "~~/utils/scaffold-eth/time";

function Selling({ orders }: any) {
  const { address: connectedAddress } = useAccount();
  const [exchangedValue, setExchangedValue] = useState(0);
  const [amountToSell, setAmountToSell] = useState<string | BigNumber>("");
  const [isApproved, setIsApproved] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(orders[0]);
  const deadLine = getFutureTimeInUnix(new Date());
  console.log(currentOrder);

  const { data: FibbonacciEscrow } = useDeployedContractInfo("FibbonacciEscrow");
  const { data: Balloons } = useDeployedContractInfo("Balloons");

  const { data: balanceBallons } = useScaffoldContractRead({
    contractName: "Balloons",
    functionName: "balanceOf",
    args: [connectedAddress],
    watch: true,
  });

  const { writeAsync: approveTokens } = useScaffoldContractWrite({
    contractName: "Balloons",
    functionName: "approve",
    args: [FibbonacciEscrow?.address, multiplyTo1e18(amountToSell)],
  });

  const { writeAsync: escrowTokens } = useScaffoldContractWrite({
    contractName: "FibbonacciEscrow",
    functionName: "takeDeal",
    args: [
      currentOrder.id,
      multiplyTo1e18(amountToSell),
      currentOrder.priceTotalExchange,
      BigNumber.from(deadLine),
      "0x02C48c159FDfc1fC18BA0323D67061dE1dEA329F",
      Balloons?.address,
    ],
  });

  useEffect(() => {
    if (amountToSell) {
      setExchangedValue(amountToSell * orders[0].pricePerCoinExchange);
    }
  }, [amountToSell]);

  return (
    <section>
      <div className="dark:bg-form-gradient rounded-[20px] bg-light-form-gradient">
        <SwapInput
          currency={USDT}
          setValue={setAmountToSell}
          amount={amountToSell}
          handleOnChange={e => setAmountToSell(e.target.value)}
          balance={balanceBallons}
        />
        <SwapInput
          currency={COP}
          isLocked
          setValue={setAmountToSell}
          amount={exchangedValue}
          balance={balanceBallons}
        />
      </div>
      <div className="text-sm leading-4 w-full">
        <button
          className={`text-sm py-5 px-4 rounded-lg  focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent ${
            isApproved ? "hidden" : "block"
          }`}
          onClick={async () => {
            await approveTokens();
            setIsApproved(true);
          }}
        >
          Approve
        </button>

        <button
          className={`text-sm py-5 px-4 rounded-lg  focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent ${
            isApproved ? "block" : "hidden"
          }`}
          onClick={async () => {
            await escrowTokens();
            setIsApproved(false);
          }}
        >
          Sell Tokens
        </button>
      </div>
    </section>
  );
}

export { Selling };
