import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Swap from "~~/components/swap-ui/Swap";
import { db } from "~~/services/db";

function Home({ data }) {
  console.log(data);
  return (
    <>
      <MetaHeader title="Fibbonacci Swap" description="Fibbonacci Swap is an on/off ramp fiat to crypto for LATAM.">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        <Swap orders={orders} />
      </div>
    </>
  );
};

export default Home;
