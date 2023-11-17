import Token from "~~/components/main/Token";

export interface Token {
  name: string;
  symbol: string;
}

export interface ForexToken extends Token {
  forex: boolean;
}
interface SellingSideProps {
  children: React.ReactNode;
  token: Token;
  currency: ForexToken;
}
const SellingSide: React.FC<SellingSideProps> = ({ children, token, currency }) => (
  <form className="w-full  border dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B] flex flex-col gap-4 p-10 rounded-lg">
    <div className="w-full flex flex-row gap-5 items-center">
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2>Vendes</h2>
          <Token symbol={token.symbol} name={token.name} />
        </div>
        <input
          placeholder="Cantidad de tokens"
          type="number"
          className="input input-bordered bg-transparent w-full max-w-xs"
        />
      </div>
      <div className="w-full  flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <h2>Recibes</h2>
          <Token symbol={currency.symbol} name={currency.name} />
        </div>
        <input
          type="number"
          placeholder="Valor por token"
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
export default SellingSide;
