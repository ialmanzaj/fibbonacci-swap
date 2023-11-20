import React, { useState } from "react";
import { MetaHeader } from "~~/components/MetaHeader";
import BuyingSide from "~~/components/liquidity/buying";
import SellingSide from "~~/components/liquidity/selling";
import { SwapButtons } from "~~/components/main/SwapButtons";
import BelvoWidget from "~~/components/scaffold-eth/BelvoWidget";

function Liquidity() {
  const [isSelling, setIsSelling] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  const UsdtToken = {
    name: "USDT",
    symbol: "USD",
    image: "https://cdn.via.exchange/tokens/USDT.svg",
    forex: false,
  };

  const COP = {
    name: "Pesos colombianos",
    symbol: "COP",
    image: "https://wise.com/web-art/assets/flags/cop.svg",
    forex: true,
  };

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
            <SellingSide currencyIn={UsdtToken} currencyOut={COP}>
              <BelvoWidget />
            </SellingSide>
          ) : (
            <BuyingSide currencyIn={COP} currencyOut={UsdtToken}>
              <BelvoWidget />
            </BuyingSide>
          )}
        </div>
      </section>
    </>
  );
}

export default Liquidity;
