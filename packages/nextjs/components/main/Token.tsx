import React from "react";
import Image from "next/image";

function Token({ name, icon }: { name: string; icon: string }) {
  return (
    <div
      className="text-white h-10 rounded-[20px] p-[6px] border-[#D2D2D7] dark:border-[#343534] bg-light-action-gradient bg-dark-action-gradient border-[2px] overflow-hidden transition-all dark:hover:bg-button-main-gradient hover:bg-[#555] hover:bg-gray-200 relative mb-1 flex items-center transition-colors  "
      data-testid="button-сhoose-from-token"
    >
      <div className="relative">
        <Image
          width={28}
          height={28}
          className="mr-2 rounded-full"
          src={icon}
          alt={name}
          style={{ borderWidth: "1.2px" }}
        />
      </div>
      <span className="font-semibold overflow-hidden text-ellipsis md:max-w-[130px] text-sm px-1">{name}</span>
    </div>
  );
}

export default Token;
