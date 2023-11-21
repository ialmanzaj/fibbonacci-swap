import React, { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import BelvoWidget from "~~/components/belvo/BelvoWidget";
import { COP, USDT } from "~~/components/currencies";
import BuyingSide from "~~/components/liquidity/buying";
import SellingSide from "~~/components/liquidity/selling";
import { SwapButtons } from "~~/components/main/SwapButtons";

function Liquidity() {
  const [isSelling, setIsSelling] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  return (
    <>
      <MetaHeader
        title="Merchants | Fibbonacci Swap"
        description="Fibbonacci Swap is an on/off ramp fiat to crypto for LATAM."
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <section className="flex flex-col justify-center items-center   h-full">
        <div className="flex flex-col justify-center items-center gap-2 p-10 h-full w-1/2">
          <SwapButtons isSelling={isSelling} setIsSelling={setIsSelling} />

          {isSelling ? (
            <SellingSide currencyIn={USDT} currencyOut={COP}>
              <BelvoWidget />
            </SellingSide>
          ) : (
            <BuyingSide currencyIn={COP} currencyOut={USDT}>
              <BelvoWidget />
            </BuyingSide>
          )}
        </div>
      </section>
    </>
  );
}

export default Liquidity;
