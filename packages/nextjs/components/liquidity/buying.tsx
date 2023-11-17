import { ForexToken, Token } from "./selling";
import TokenSymbol from "~~/components/main/Token";

interface BuyingSideProps {
  children: React.ReactNode;
  token: Token;
  currency: ForexToken;
}

const BuyingSide: React.FC<BuyingSideProps> = ({ children, token, currency }) => (
  <form className="w-full  border dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B] flex flex-col gap-4 p-10 rounded-lg">
    <div className="w-full flex flex-row gap-5 items-center">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2>Compras</h2>
          <TokenSymbol symbol={currency.symbol} name={currency.name} />
        </div>
        <input placeholder="Valor" type="number" className="input input-bordered bg-transparent w-full max-w-xs" />
      </div>
      <div className="w-full  flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2>Recibes</h2>
          <TokenSymbol symbol={token.symbol} name={token.name} />
        </div>
        <input
          type="number"
          placeholder="Cantidad de Tokens "
          className="input input-bordered bg-transparent w-full max-w-xs"
        />
      </div>
    </div>

    <div className="divider" />
    <h2>Rango</h2>
    <div className="flex flex-row  gap-4">
      <input type="number" placeholder="Min" className="input input-bordered bg-transparent w-full max-w-xs" />
      <input type="number" placeholder="Max" className="input input-bordered bg-transparent w-full max-w-xs" />
    </div>
    {children}
    <button className="btn btn-ghost bg-indigo-600">Crear orden</button>
  </form>
);
export default BuyingSide;
