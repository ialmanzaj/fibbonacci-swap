import { ChangeEvent, useState } from "react";
import { CopyIcon } from "./assets/CopyIcon";
import { DiamondIcon } from "./assets/DiamondIcon";
import { HareIcon } from "./assets/HareIcon";
import { ArrowSmallRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import BelvoWidget, { createWidget } from "~~/components/BelvoWidget";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export const ContractInteraction = () => {
  const [visible, setVisible] = useState(true);
  const [newGreeting, setNewGreeting] = useState("");
  const [value, setValue] = useState<string | undefined>("");

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "P2PEscrow",
    functionName: "setGreeting",
    args: [newGreeting],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (e.target.value === "" || re.test(e.target.value)) {
      const inputValue = e.target.value.replace(/[^\d]/g, ""); // Remove non-numeric characters
      // Format the number using Intl.NumberFormat
      //const formattedValue = new Intl.NumberFormat().format(Number(inputValue));

      setValue(inputValue);
    }
  };

  return (
    <div className="flex relative pb-10 bg-gray-800 	">
      <BelvoWidget />
      <main className="relative my-auto flex flex-col items-center p-4 pt-0 md:p-6 mt-0 md:mt-[100px] mx-auto">
        <section className="w-full max-w-md">
          <div className="relative mb-10">
            <div className="mb-4 flex items-center justify-between md:justify-end">
              <nav className="flex-1 z-[1] flex items-center">
                <div className="relative inline-block max-w-[50%]  md:max-w-none">
                  <button
                    type="button"
                    className="px-3 py-[10px] dark:text-white text-lightDark/80  rounded-[20px] border-[2px] transition-all border-transparent font-semibold text-[14px] overflow-visible h-10 leading-tight !border-[#343534] dark:hover:bg-button-main-gradient hover:bg-button-main-gradient bg-dark-action-gradient !text-white"
                  >
                    Compra
                  </button>
                </div>
                <div className="relative inline-block max-w-[50%] md:max-w-none">
                  <button
                    type="button"
                    className="px-3 py-[10px] dark:text-white text-lightDark/80 rounded-[20px] border-[2px] transition-all border-transparent font-semibold text-[14px] overflow-visible h-10 leading-tight"
                  ></button>
                </div>
              </nav>
              <div className="flex bg-gradient-to-t dark:from-white/[0.08] from-[#E8E8ED] to-[#DFDFE6] dark:to-white/[0.06] rounded-[20px] h-10 flex items-center justify-center">
                <button
                  className="flex items-center justify-center rounded-full text-[#4d4f51] transition-colors dark:text-[#cecece] h-10 w-10 border border-transparent transition-all hover:border-white/[0.08] dark:hover:bg-[#6B6B6B] hover:bg-[#D2D2D7] active:opacity/80"
                  type="button"
                >
                  <div className="flex items-center justify-center transition-all rounded-2xl w-[100%] h-[100%]">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      style={{ width: 16, height: 16 }}
                    >
                      <g opacity="0.8" stroke="currentColor" strokeWidth="1.4">
                        <path d="M1 3h2M6 3h9M1 8h9M13 8h2M1 13h4M8 13h7" strokeLinecap="round" />
                        <rect x={3} y={1} width="2.6" height={4} rx={1} />
                        <rect x={10} y={6} width="2.6" height={4} rx={1} />
                        <rect x={5} y={11} width="2.6" height={4} rx={1} />
                      </g>
                    </svg>
                  </div>
                </button>
                <button
                  disabled=""
                  className="dark:text-[#cecece] text-[#4d4f51] ml-1.5 flex items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed h-10 w-10 border border-transparent transition-all hover:border-white/[0.08] dark:hover:bg-[#6B6B6B] hover:bg-[#D2D2D7] active:opacity/80"
                  type="button"
                >
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="origin-center"
                  >
                    <path
                      d="M18 11.2C17.7878 11.2 17.5843 11.2843 17.4343 11.4343C17.2843 11.5843 17.2 11.7878 17.2 12C17.2079 13.1375 16.844 14.2464 16.1637 15.1581C15.4834 16.0698 14.5239 16.7342 13.4312 17.0505C12.3385 17.3667 11.1725 17.3173 10.1104 16.9099C9.04837 16.5024 8.14849 15.7592 7.54767 14.7933C6.94685 13.8274 6.67799 12.6917 6.78199 11.5589C6.88599 10.4262 7.35716 9.35842 8.12381 8.51807C8.89047 7.67772 9.91064 7.1108 11.0291 6.90356C12.1476 6.69632 13.3032 6.86011 14.32 7.37L13.39 7.58001C13.198 7.62375 13.029 7.73674 12.9151 7.89736C12.8012 8.05798 12.7506 8.25495 12.7729 8.45056C12.7952 8.64618 12.8888 8.82671 13.0359 8.9576C13.1829 9.08849 13.3731 9.16056 13.57 9.16001C13.6296 9.16989 13.6904 9.16989 13.75 9.16001L16.42 8.56001C16.4942 8.56001 16.5552 8.53833 16.62 8.50001C16.8131 8.36633 16.9023 8.2074 17 8.00001C17.0243 7.8808 17.0182 7.71877 17 7.6L16.27 4.72001C16.2107 4.52293 16.0777 4.35631 15.8986 4.25477C15.7196 4.15323 15.5083 4.1246 15.3088 4.17482C15.1092 4.22504 14.9366 4.35025 14.827 4.52442C14.7173 4.69859 14.679 4.90832 14.72 5.11001L14.92 5.92C13.5886 5.2885 12.0878 5.1073 10.6443 5.40373C9.20084 5.70016 7.89298 6.45815 6.91817 7.56326C5.94336 8.66838 5.35452 10.0606 5.24056 11.5298C5.12659 12.999 5.49368 14.4654 6.28641 15.7076C7.07914 16.9498 8.25448 17.9004 9.63499 18.4159C11.0155 18.9314 12.5262 18.9838 13.9391 18.5652C15.352 18.1466 16.5904 17.2797 17.4673 16.0953C18.3441 14.911 18.8119 13.4736 18.8 12C18.8 11.7878 18.7157 11.5843 18.5657 11.4343C18.4157 11.2843 18.2122 11.2 18 11.2Z"
                      fill="currentColor"
                      fillOpacity="0.8"
                    />
                    <circle
                      cx={12}
                      cy={12}
                      r="11.5"
                      fill="none"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit={10}
                      strokeDasharray={100}
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="dark:bg-form-gradient rounded-[20px] bg-light-form-gradient">
              <div className="relative flex justify-between w-full h-24 p-1.5 rounded-xl transition-all items-start rounded-[20px] border h-[141px] px-4 py-8 md:p-8 items-center dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B]">
                <div className="flex justify-between overflow-hidden w-full">
                  <div className="flex flex-col w-full justify-between">
                    <div className="">
                      <p className="m-0 text-white">Tú envías</p>
                    </div>
                    <input
                      className="enabled:text-white h-12 w-48 bg-transparent p-2 text-2xl outline-none placeholder:text-black-400 placeholder:text-opacity-100 dark:placeholder:text-white-400 md:w-60 !w-full !font-semibold !text-[28px] !pl-0"
                      inputMode="decimal"
                      title="Token Amount"
                      autoComplete="off"
                      autoCorrect="off"
                      type="text"
                      value={value}
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      onChange={handleChange}
                      placeholder="0"
                      minLength={1}
                      maxLength={79}
                      spellCheck="false"
                      data-testid="input-base-tokens-amount"
                      defaultValue=""
                    />
                  </div>
                  <div className="flex min-w-max flex-col items-end justify-between gap-4 text-left overflow-hidden">
                    <div
                      
                      className="text-white h-10 rounded-[20px] p-[6px] border-[#D2D2D7] dark:border-[#343534] bg-light-action-gradient bg-dark-action-gradient border-[2px] overflow-hidden transition-all dark:hover:bg-button-main-gradient hover:bg-[#555] hover:bg-gray-200 relative mb-1 flex items-center transition-colors  "
                      data-testid="button-сhoose-from-token"
                    >
                      <div className="relative">
                        <img
                          width={28}
                          height={28}
                          className="mr-2 rounded-full"
                          src="https://cdn.via.exchange/tokens/USDT.svg"
                          alt="USDT Coin"
                          style={{ borderWidth: "1.2px" }}
                        />
                        {/*  <img
                          width={18}
                          height={18}
                          className="absolute left-4 rounded -top-[2px]"
                          src="https://cdn.via.exchange/networks/Polygon.svg"
                          alt="Polygon"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            borderWidth: 2,
                            borderColor: "rgba(204, 204, 204, 0.2)",
                          }}
                        /> */}
                      </div>
                      <span className="font-semibold overflow-hidden text-ellipsis md:max-w-[130px] text-sm px-1">USDT</span>
                      {/* <svg
                        width={24}
                        height={24}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        className="dark:text-white-400"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.1553 6.98964C11.8624 6.67012 11.3876 6.67012 11.0947 6.98964L9 9.27473L6.90533 6.98964C6.61244 6.67012 6.13756 6.67012 5.84467 6.98964C5.55178 7.30916 5.55178 7.8272 5.84467 8.14672L8.46967 11.0104C8.76256 11.3299 9.23744 11.3299 9.53033 11.0104L12.1553 8.14672C12.4482 7.8272 12.4482 7.30916 12.1553 6.98964Z"
                          fill="currentColor"
                        />
                      </svg> */}
                    </div>
                    <span className="text-sm dark:text-white-400 leading-none text-[#9ca3af]">
                      <span className="dark:text-white/80 text-[#141418CC] font-semibold"></span>
                      <button type="button" className="test-sm ml-1 rounded-lg px-1 leading-none uppercase">
                        Max
                      </button>
                    </span>
                  </div>
                </div>
                <button
                  className="dark:border-[#343534] border-white bg-light-action-gradient dark:bg-dark-action-gradient border-[2px] block w-6 h-6 rounded-full  transition-colors disabled:bg-black-100 disabled:bg-opacity-80 disabled:cursor-not-allowed translate-y-2/4 hover:opacity/80 absolute bottom-0 left-1/2 -translate-x-1/2 rotate-90"
                  type="button"
                >
                  <div className="mx-auto flex items-center justify-center transition-all rounded-2xl w-[100%] h-[100%]">
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      style={{ width: 16, height: 16 }}
                    >
                      <path
                        d="M3.333 9.771c0-.316.235-.577.54-.619l.085-.006h12.5a.625.625 0 0 1 .085 1.245l-.085.005h-12.5a.625.625 0 0 1-.625-.625Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10.976 5.194a.625.625 0 0 1 .812-.946l.07.06 5.042 5.02c.223.222.243.57.06.816l-.06.07-5.042 5.02a.625.625 0 0 1-.943-.815l.061-.07 4.597-4.578-4.597-4.577Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </button>
              </div>
              <div className="flex w-full flex-wrap items-start justify-between rounded-xl p-1.5 rounded-[20px] border border-transparent h-[141px] px-4 py-8 md:p-8 items-center dark:border-[#272D67] border-[#272D67] bg-[#18181B]">
                <div className="flex justify-between overflow-hidden w-full">
                  <div className="flex flex-col w-full justify-between">
                    <div className="">
                      <p className="m-0 text-white font-light">Tú recibes</p>
                    </div>
                    <input
                      className="enabled:text-white  h-12 w-48 bg-transparent p-2 text-2xl  outline-none placeholder:text-black-400 placeholder:text-opacity-100 dark:placeholder:text-white-400 md:w-60 !w-full !font-semibold !text-[28px] !pl-0"
                      inputMode="decimal"
                      title="Token Amount"
                      autoComplete="off"
                      autoCorrect="off"
                      type="text"
                      pattern="^[0-9]*[.,]?[0-9]*$"
                      placeholder="0"
                      minLength={1}
                      maxLength={79}
                      spellCheck="false"
                      data-testid="input-base-tokens-amount"
                      defaultValue=""
                    />
                  </div>
                  <div className="flex min-w-max flex-col items-end justify-between gap-4 text-left overflow-hidden">
                    <div
                    
              
                      className="text-white h-10 rounded-[20px] p-[6px] border-[#D2D2D7] dark:border-[#343534] bg-light-action-gradient bg-dark-action-gradient border-[2px] overflow-hidden transition-all dark:hover:bg-button-main-gradient hover:bg-[#555] hover:bg-gray-200 relative mb-1 flex items-center transition-colors "
                      data-testid="button-сhoose-from-token"
                    >
                      <div className="relative">
                        <img
                          width={28}
                          height={28}
                          className="mr-2 rounded-full"
                          src="https://wise.com/web-art/assets/flags/cop.svg"
                          alt="USD Coin"
                          style={{ borderWidth: "1.2px" }}
                        />
                        {/* <img
                          width={18}
                          height={18}
                          className="absolute left-4 rounded -top-[2px]"
                          src="https://cdn.via.exchange/networks/Polygon.svg"
                          alt="Polygon"
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.12)",
                            borderWidth: 2,
                            borderColor: "rgba(204, 204, 204, 0.2)",
                          }}
                        /> */}
                      </div>
                      <span className="font-semibold overflow-hidden text-ellipsis md:max-w-[130px] text-sm px-1">COP</span>
                      {/* <svg
                        width={24}
                        height={24}
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        className="dark:text-white-400"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12.1553 6.98964C11.8624 6.67012 11.3876 6.67012 11.0947 6.98964L9 9.27473L6.90533 6.98964C6.61244 6.67012 6.13756 6.67012 5.84467 6.98964C5.55178 7.30916 5.55178 7.8272 5.84467 8.14672L8.46967 11.0104C8.76256 11.3299 9.23744 11.3299 9.53033 11.0104L12.1553 8.14672C12.4482 7.8272 12.4482 7.30916 12.1553 6.98964Z"
                          fill="currentColor"
                        />
                      </svg> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-sm leading-4 w-full flex-col md:flex-row md:w-full md:flex justify-between gap-1 flex-wrap">
              <button
                className="rounded-[20px] dark:text-white/80 text-[rgba(20,20,24,0.80)] mb-4 md:mb-0 h-10  dark:bg-white-40 dark:active:bg-white-120 mr-3 flex h-8 items-center rounded-lg  p-2 transition-colors "
                type="button"
                data-testid="button-current-rates"
              >
                <span>1 USDC</span>
                <div className="mx-1.5">–</div>
                <span>0.000526 ETH</span>
              </button>
              <div className="bg-gray-100 dark:bg-white-40 px-2 flex items-center invisible rounded-[20px] h-10">
                <div
                  className="animate-pulse rounded-lg bg-gray-200 dark:bg-white-120 bg-gray-300"
                  style={{ width: 40, minWidth: 40, height: 12 }}
                />
              </div>
            </div>
            <div className="mt-6 text-sm leading-4 w-full">
              <a
                href="/"
                type="a"
                className="text-sm py-5 px-4 focus:ring-2 bg-indigo-800 text-white duration-200 focus:ring-offset-2 focus:ring-white  w-full inline-flex items-center justify-center ring-1 ring-transparent"
              >
                Comprar
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* <div className="flex flex-col w-full mx-5 sm:mx-8 2xl:mx-20">
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
      </div> */}
    </div>
  );
};
// Hook
