import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader title="Fibbonacci Swap" description="Fibbonacci Swap is an on/off ramp fiat to crypto for LATAM.">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
      </div>
    </>
  );
};

export default Home;
