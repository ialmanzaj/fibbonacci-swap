import { ChangeEvent, useEffect, useState } from "react";
import BuyStepOne from "./BuyStepOne";
import Swap from "./Swap";
import { useAccount } from "wagmi";
import { useScaffoldContractRead, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const CURRENTPRICES = [4200, 4150, 4180];
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState<number | null>(null);
  const [exchangeValue, setExchangeValue] = useState<number | null>(null);
  const [isSelling, setIsSelling] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    const currentPrice = Math.min(...CURRENTPRICES);
    if (value != null) {
      setExchangeValue(value * currentPrice);
    }
  }, [value]);

  const { data } = useScaffoldContractRead({
    contractName: "Balloons",
    functionName: "balanceOf",
    args: [address],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (e.target.value === "" || re.test(e.target.value)) {
      const inputValue = e.target.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
      // Format the number using Intl.NumberFormat
      //const formattedValue = new Intl.NumberFormat().format(Number(inputValue));
      setValue(inputValue);
    }
  };

  return (
    <div className="flex relative pb-10 bg-black">
      <BuyStepOne>
        <Swap
          value={value}
          handleChange={handleChange}
          exchangeValue={exchangeValue}
          data={data}
          setValue={setValue}
          isSelling={isSelling}
          setVisible={setVisible}
        />
      </BuyStepOne>
    </div>
  );
};
