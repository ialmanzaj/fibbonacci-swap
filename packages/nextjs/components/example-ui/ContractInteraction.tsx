import { useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "P2PEscrow",
    functionName: "setGreeting",
    args: [newGreeting],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex relative pb-10 bg-gray-800 ">
      <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
        <div className="flex flex-col h-screen bg-gray-900">
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-2xl mx-auto bg-gray-700 rounded-lg shadow-2xl p-6">
              <h1 className="text-2xl font-bold text-white mb-4">P2P</h1>
              <div className="flex justify-start space-x-4 mb-4">
                <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-transparent text-white rounded-lg shadow-2xl p-3">
                  Buy
                </button>
                <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 bg-transparent text-white rounded-lg shadow-2xl p-3">
                  Sell
                </button>
              </div>
              <form className="space-y-4">
                <div className="flex flex-col space-y-2 bg-gray-800 rounded-lg p-3">
                  <label className="font-medium text-gray-300">You send</label>
                  <div className="flex justify-between">
                    <input
                      className="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white rounded-lg border-none focus:border-transparent flex-grow"
                      placeholder="0.0"
                      type="number"
                    />
                    <div className="relative flex-grow-0">
                      <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-pink-500 text-white rounded-full w-full shadow-2xl p-4 focus:outline-none hover:bg-pink-500">
                        Select Token
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className=" ml-2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 bg-gray-800 rounded-lg p-3">
                  <label className="font-medium text-gray-300">You receive</label>
                  <div className="flex justify-between">
                    <input
                      className="flex h-10 w-full border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-gray-800 text-white rounded-lg border-none focus:border-transparent flex-grow"
                      placeholder="0.0"
                      type="number"
                    />
                    <div className="relative flex-grow-0">
                      <button className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 bg-pink-500 text-white rounded-full w-full shadow-2xl p-4 focus:outline-none hover:bg-pink-500">
                        Select Token
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className=" ml-2"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
