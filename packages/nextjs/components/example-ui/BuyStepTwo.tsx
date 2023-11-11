import React, { ReactNode, useState } from "react";

interface DropdownProps {
  label?: string;
  name: string;
  items: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ label, name, items }) => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="mt-5">
      <div className="relative w-full">
        <input
          className="peer hidden"
          checked={isOpen}
          onChange={handleDropdownToggle}
          type="checkbox"
          name={name}
          id={name}
          defaultChecked={false}
        />
        <label
          htmlFor={name}
          className=" flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-zinc-300 ring-blue-400 peer-checked:ring"
        >
          {selectedItem || label}
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-zinc-300 transition peer-checked:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        <ul
          className={`max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-xl transition-all duration-300 ${
            isOpen ? "peer-checked:max-h-56 peer-checked:py-3" : ""
          }`}
        >
          {items.map((item, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer px-3 py-2 text-sm text-white hover:bg-blue-500 hover:text-white"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface BuyStepsProps {
  step1Content: ReactNode;
}

const BuySteps: React.FC<BuyStepsProps> = ({ step1Content }) => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    <div className="flex w-screen flex-wrap ">
      <div className="flex w-full flex-col md:w-1/2 mx-auto">
        <div className="flex flex-col justify-center pt-8 md:justify-start">
          <div className="flex w-full flex-col rounded-2xl bg-ebony shadow-inset px-8 py-10">
            <div className="mx-auto w-full max-w-md pb-8 px-8 sm:px-0">
              <div className="relative">
                <div className="absolute left-0 top-2 h-0.5 w-full bg-gray-200" aria-hidden="true">
                  <div className="absolute h-full w-1/3 bg-gray-900" />
                  <div
                    className={`left absolute left-${
                      (activeStep - 1) * 50
                    }% h-full w-1/3 bg-gradient-to-r from-gray-900`}
                  />
                </div>
                <ul className="relative flex w-full justify-between">
                  <li className="text-left">
                    <a
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        activeStep === 1
                          ? "bg-gray-600 text-xs font-semibold text-white"
                          : "bg-gray-300 text-xs font-semibold text-white"
                      }`}
                      href="#"
                      onClick={() => handleStepClick(1)}
                    >
                      1
                    </a>
                  </li>
                  <li className="text-left">
                    <a
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${
                        activeStep === 2
                          ? "bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                          : "bg-gray-300 text-xs font-semibold text-white"
                      }`}
                      href="#"
                      onClick={() => handleStepClick(2)}
                    >
                      2
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Content for Step 1 */}
            {activeStep === 1 && <div className="mt-8 flex w-full flex-col pb-8">{step1Content}</div>}
            {/* Content for Step 2 */}
            {activeStep === 2 && (
              <div className="mt-8 flex w-full flex-col pb-8">
                <h2 className="text-2xl font-semibold text-zinc-300">Retirar</h2>
                <Dropdown label="Selecciona tu banco" name="bank" items={["Bancolombia", "Nequi", "Daviplata"]} />
                <Dropdown label="Selecciona tipo de cuenta" name="account" items={["Ahorros"]} />
                <input
                  type="text"
                  placeholder="Numero de cuenta"
                  className="mt-5 h-12 w-full rounded-md bg-gray-100 px-3"
                />
                <button className="mt-5 my-2 flex items-center justify-center rounded-md bg-blue-900 py-3 font-medium text-white">
                  Vender crypto
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ml-4 h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuySteps;
