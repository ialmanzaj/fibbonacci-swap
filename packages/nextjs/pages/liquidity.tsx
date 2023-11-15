import React, { useState } from "react";
import { SwapButtons } from "~~/components/main/SwapButtons";
import Token from "~~/components/main/Token";

function Liquidity() {
  const [isSelling, setIsSelling] = useState(false);
  const [rangeValue, setRangeValue] = useState(0);

  const UsdtToken = {
    name: "USDT",
    symbol: "https://cdn.via.exchange/tokens/USDT.svg",
  };

  const Cop = {
    name: "COP",
    symbol: "https://wise.com/web-art/assets/flags/cop.svg",
    forex: true,
  };

  return (
    <section className="flex flex-col justify-center items-center   h-full">
      <div className="flex flex-col justify-center items-center gap-2 p-10 h-full w-1/2">
        <SwapButtons isSelling={isSelling} setIsSelling={setIsSelling} />

        {isSelling ? (
          <form className="w-full  border dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B] flex flex-col gap-4 p-10 rounded-lg">
            <div className="w-full flex flex-row gap-5 items-center">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between">
                  <h2>Vendes</h2>
                  <Token symbol={UsdtToken.symbol} name={UsdtToken.name} />
                </div>
                <input
                  placeholder="Cantidad de tokens"
                  type="number"
                  className="input input-bordered bg-transparent w-full max-w-xs"
                />
              </div>
              <div className="w-full  flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between">
                  <h2>Recibes</h2>
                  <Token symbol={Cop.symbol} name={Cop.name} />
                </div>
                <input
                  type="number"
                  placeholder="Valor por token"
                  className="input input-bordered bg-transparent w-full max-w-xs"
                />
              </div>
            </div>

            <div className="divider" />
            <h2>Rango</h2>
            <div className="flex flex-row  gap-4">
              <input type="number" placeholder="Min" className="input input-bordered bg-transparent w-full max-w-xs" />
              <input type="number" placeholder="Max" className="input input-bordered bg-transparent w-full max-w-xs" />
            </div>
            <button className="btn btn-ghost bg-indigo-600">Crear orden</button>
          </form>
        ) : (
          <form className="w-full  border dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B] flex flex-col gap-4 p-10 rounded-lg">
            <div className="w-full flex flex-row gap-5 items-center">
              <div className="w-full flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between">
                  <h2>Compras</h2>
                  <Token symbol={Cop.symbol} name={Cop.name} />
                </div>
                <input
                  placeholder="Valor"
                  type="number"
                  className="input input-bordered bg-transparent w-full max-w-xs"
                />
              </div>
              <div className="w-full  flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between">
                  <h2>Recibes</h2>
                  <Token symbol={UsdtToken.symbol} name={UsdtToken.name} />
                </div>
                <input
                  type="number"
                  placeholder="Cantidad de Tokens "
                  className="input input-bordered bg-transparent w-full max-w-xs"
                />
              </div>
            </div>

            <div className="divider" />
            <h2>Rango</h2>
            <div className="flex flex-row  gap-4">
              <input type="number" placeholder="Min" className="input input-bordered bg-transparent w-full max-w-xs" />
              <input type="number" placeholder="Max" className="input input-bordered bg-transparent w-full max-w-xs" />
            </div>
            <button className="btn btn-ghost bg-indigo-600">Crear orden</button>
          </form>
        )}
      </div>
    </section>
  );
}

export default Liquidity;
