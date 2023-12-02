import React, { useState } from "react";
import { useRouter } from "next/router";
import { formatEther } from "ethers/lib/utils.js";
import { getSession, useSession } from "next-auth/react";
import { MetaHeader } from "~~/components/MetaHeader";
import { formatCurrency } from "~~/components/liquidity/selling";
import BuySteps from "~~/components/swap-ui/BuyStepOne";
import { db } from "~~/services/db";

export default function TransactionDetail({ transaction }) {
  console.log("currentTrasaction", transaction);
  const exchange = formatCurrency(formatEther(transaction.totalPriceExchange));
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
          <BuySteps>
            <section className="">
              <div className="py-6 mx-6 h-80 justify-center flex flex-col">
                <div className="items-center justify-center	flex">
                  <svg width={80} height={80} viewBox="0 0 124 123" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M123.5 61.5C123.5 95.4655 95.9655 123 62 123C28.0345 123 0.5 95.4655 0.5 61.5C0.5 27.5345 28.0345 0 62 0C95.9655 0 123.5 27.5345 123.5 61.5ZM6.25046 61.5C6.25046 92.2896 31.2104 117.25 62 117.25C92.7896 117.25 117.75 92.2896 117.75 61.5C117.75 30.7104 92.7896 5.75046 62 5.75046C31.2104 5.75046 6.25046 30.7104 6.25046 61.5Z"
                      fill="#00A91B"
                    />
                    <path
                      d="M91.5058 41.1926L53.3793 79.319L36.0491 61.9888"
                      stroke="url(#paint0_linear_9_183)"
                      strokeWidth="7.10983"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_9_183"
                        x1="33.2052"
                        y1="60.4335"
                        x2="59.1561"
                        y2="70.0318"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stopColor="#00A91B" />
                        <stop offset={1} stopColor="#00A91B" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="max-w-lg mx-auto">
                  <h1 className="text-3xl text-center">Your transaction has been succesfully submited</h1>
                  <h3>You will receive {exchange} in your bank account within 5-15min</h3>
                </div>
              </div>
            </section>
          </BuySteps>
        </div>
      </section>
    </>
  );
}
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (session) {
    const transaction = JSON.parse(JSON.stringify(await db.escrow.findUnique({ where: { id: Number(ctx.query.id) } })));
    return {
      props: {
        transaction: transaction,
      },
    };
  }
}
