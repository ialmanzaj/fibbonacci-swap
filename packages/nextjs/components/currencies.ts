export type Currency = {
  symbol: string;
  icon: string;
  forex: boolean;
};

export const USDT: Currency = {
  symbol: "USDT",
  icon: "https://cdn.via.exchange/tokens/USDT.svg",
  forex: false,
};

export const COP: Currency = {
  symbol: "COP",
  icon: "https://wise.com/web-art/assets/flags/cop.svg",
  forex: true,
};
