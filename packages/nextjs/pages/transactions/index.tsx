import React, { useState } from "react";
import { formatEther } from "ethers/lib/utils.js";
import { getSession, useSession } from "next-auth/react";
import { MetaHeader } from "~~/components/MetaHeader";
import { formatCurrency } from "~~/components/liquidity/selling";
import BuySteps from "~~/components/swap-ui/BuyStepOne";
import { db } from "~~/services/db";

export default function Transactions({ orders }) {
  return (
    <>
      <MetaHeader
        title="Merchants | Fibbonacci Swap"
        description="Fibbonacci Swap is an on/off ramp fiat to crypto for LATAM."
      >
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <section className="flex flex-row justify-center items-center   h-full">
        <div className="flex flex-row justify-center items-center gap-2 p-10 h-full w-1/2">
          <div className="grid gap-3">
            {orders.map((item, index) => (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
                <div className="p-6 flex flex-col gap-2">
                  <h2 className="font-semibold text-lg">Order #{item.id}</h2>

                  <p className="font-bold text-lg">{formatCurrency(item.amountExchange)}</p>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 self-start">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session) {
    const orders = JSON.parse(JSON.stringify(await db.order.findMany({ where: { userId: session.user?.name || "" } })));
    return {
      props: {
        orders: orders,
      },
    };
  }
}
