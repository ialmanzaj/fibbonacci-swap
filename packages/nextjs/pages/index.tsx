import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader
        title="Fibbonacci Swap"
        description="Fibbonacci Swap is an on/off ramp fiat to crypto for LATAM."
      >
        {/* We are importing the font this way to lighten the size of SE2. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree&display=swap" rel="stylesheet" />
      </MetaHeader>
      <div className="grid lg:grid-cols-1 flex-grow" data-theme="exampleUi">
        <ContractInteraction />
        {/*  <ContractData /> */}
      </div>
    </>
  );
};

export default Home;
