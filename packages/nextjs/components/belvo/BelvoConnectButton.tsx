import { useState } from "react";

type BelvoConnectButtonProps = {
  text?: string;
  launchWidget: () => void;
};

export const BelvoConnectButton: React.FC<BelvoConnectButtonProps> = ({ text, launchWidget }) => {
  const [connected, setConnected] = useState(false);
  console.log(text);
  if (!connected) {
    return (
      <button className="btn btn-secondary btn-xs" type="button" onClick={launchWidget}>
        <img
          width={20}
          height={20}
          className="mr-2 rounded-full"
          src="https://wise.com/web-art/assets/flags/cop.svg"
          alt="USD Coin"
          style={{ borderWidth: "1.2px" }}
        />
        {text}
      </button>
    );
  }

  return (
    <div className="px-2 flex justify-end items-center">
      <div className="flex flex-col items-center mr-1">
        {/* <Balance address={account.address} className="min-h-0 h-auto" />
                    <span className="text-xs" style={{ color: networkColor }}>
                      {chain.name}
                    </span> */}
      </div>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-secondary btn-sm pl-0 pr-2 shadow-md dropdown-toggle">
          <img
            width={24}
            height={24}
            className="mr-2 rounded-full"
            src="https://wise.com/web-art/assets/flags/cop.svg"
            alt="USD Coin"
            style={{ borderWidth: "1.2px" }}
          />
          <span className="ml-2 mr-1">Bancolombia </span>
        </label>
      </div>
      <div>
        <input type="checkbox" id="qrcode-modal" className="modal-toggle" />
        <label htmlFor="qrcode-modal" className="modal cursor-pointer">
          <label className="modal-box relative">
            {/* dummy input to capture event onclick on modal box */}
            <input className="h-0 w-0 absolute top-0 left-0" />
            <label htmlFor="qrcode-modal" className="btn btn-ghost btn-sm btn-circle absolute right-3 top-3">
              ✕
            </label>
            <div className="space-y-3 py-6">
              <div className="flex space-x-4 flex-col items-center gap-6"></div>
            </div>
          </label>
        </label>
      </div>
    </div>
  );
};
