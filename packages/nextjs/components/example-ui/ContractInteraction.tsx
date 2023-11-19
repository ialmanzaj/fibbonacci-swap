import { ChangeEvent, useEffect, useState } from "react";
import BuyStepOne from "./BuyStepOne";
import Swap from "./Swap";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const { address } = useAccount();
  const [isSelling, setIsSelling] = useState(false);

  const { data } = useScaffoldContractRead({
    contractName: "Balloons",
    functionName: "balanceOf",
    args: [address],
  });

  return (
    <div className="flex relative pb-10 bg-black">
      {/* <BuyStepOne> */}
      <Swap setIsSelling={setIsSelling} isSelling={isSelling} data={data} />
      {/* </BuyStepOne> */}
    </div>
  );
};
