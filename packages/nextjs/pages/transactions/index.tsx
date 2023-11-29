import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { MetaHeader } from "~~/components/MetaHeader";
import BuySteps from "~~/components/swap-ui/BuyStepOne";

export default function Transactions({ transactions }) {
  console.log(transactions);
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
          <BuySteps></BuySteps>
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://127.0.0.1:3000/api/escrow/all");
  const data = await res.json();
  return {
    props: {
      transactions: data,
    },
  };
}
