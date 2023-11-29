import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { MetaHeader } from "~~/components/MetaHeader";
import BuySteps from "~~/components/swap-ui/BuyStepOne";

export default function TransactionDetail({ transaction }) {
  console.log(transaction);
  const router = useRouter();
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
          <BuySteps>{router.query.id}</BuySteps>
        </div>
      </section>
    </>
  );
}
