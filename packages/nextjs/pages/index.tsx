import Link from "next/link";
import type {GetServerSideProps, NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import { ContractData } from "~~/components/example-ui/ContractData";
import { ContractInteraction } from "~~/components/example-ui/ContractInteraction";
import { getServerSession } from 'next-auth';
import { getAuthOptions } from './api/auth/[...nextauth]';

//todo: how to implement this for protected urls
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      session: await getServerSession(req, res, getAuthOptions(req)),
    },
  };
};

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
