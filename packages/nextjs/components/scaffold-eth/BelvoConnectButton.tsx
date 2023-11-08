import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDisconnect, useSwitchNetwork } from "wagmi";
import {
  ArrowLeftOnRectangleIcon,
  ArrowTopRightOnSquareIcon,
  ArrowsRightLeftIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  QrCodeIcon,
} from "@heroicons/react/24/outline";
import { Address, Balance, BlockieAvatar } from "~~/components/scaffold-eth";
import { useNetworkColor } from "~~/hooks/scaffold-eth";
import { getBlockExplorerAddressLink, getTargetNetwork } from "~~/utils/scaffold-eth";
import  { createWidget } from "~~/components/BelvoWidget";

/**
 * Custom Wagmi Connect Button (watch balance + custom design)
 */
export const BelvoConnectButton = () => {
  const { disconnect } = useDisconnect();
  const [addressCopied, setAddressCopied] = useState(false);
  const [connected, setConnected] = useState(false);

  if (!connected) {
    return (
      <button className="btn btn-secondary btn-xs"   onClick={() => createWidget(true)} type="button">
        <img
            width={20}
            height={20}
            className="mr-2 rounded-full"
            src="https://wise.com/web-art/assets/flags/cop.svg"
            alt="USD Coin"
            style={{ borderWidth: "1.2px" }}
          /> Conecta cuenta de banco
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
