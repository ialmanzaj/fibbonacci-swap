import type { NextPage } from "next";
import { MetaHeader } from "~~/components/MetaHeader";
import Swap from "~~/components/swap-ui/Swap";
import { db } from "~~/services/db";

export async function getServerSideProps() {
  const orders = JSON.parse(JSON.stringify(await db.order.findMany()));
  console.log(orders);
  return {
    props: {
      orders: orders,
    },
  };
}

const Home: NextPage = ({ orders }) => {
  console.log(orders);
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
