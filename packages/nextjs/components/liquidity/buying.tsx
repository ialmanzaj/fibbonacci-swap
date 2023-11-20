import { useEffect, useState } from "react";
import { Currency } from "./selling";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import TokenSymbol from "~~/components/main/Token";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

type BuyingSideProps = {
  children: React.ReactNode;
  currencyIn: Currency;
  currencyOut: Currency;
};
type Inputs = {
  amount: number;
  price: number;
  min: number;
  max: number;
};

const BuyingSide: React.FC<BuyingSideProps> = ({ children, currencyIn, currencyOut }) => {
  function formatCurrency(amount: number, locale: string = "en-US", currency: string): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async data => {
    console.log(data);
    await writeAsync({
      args: ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", BigInt(data.amount)],
    });
  };

  const { address } = useAccount();

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "Balloons",
    functionName: "approve",
    args: [address, BigInt(0)],
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  const [totalValue, setTotalValue] = useState("0");
  const [data, setData] = useState({
    amount: 0,
    price: 0,
  });

  useEffect(() => {
    if (errors.amount || errors.price) {
      return;
    }
    if (!data.amount || !data.price || Number.isNaN(data.amount) || Number.isNaN(data.price)) {
      setTotalValue("0");
      return;
    }
    setTotalValue(formatCurrency(data.amount / data.price, "en-US", currencyOut.symbol));
  }, [data]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full  border dark:bg-formActive/[0.08] dark:border-[#272D67] border-[#272D67] bg-[#18181B] flex flex-col gap-4 p-10 rounded-lg"
    >
      <div className="w-full flex flex-row gap-5 items-center">
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h2>Envias</h2>
            <TokenSymbol symbol={currencyIn.image} name={currencyIn.symbol} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {errors.amount && <span className="text-red-500 label-text">Required</span>}
              <span className="label-text-alt">Cuanto vas a comprar?</span>
            </label>
            <input
              {...register("amount", { required: true })}
              placeholder="0"
              onChange={e => setData({ ...data, amount: parseFloat(e.target.value) })}
              type="number"
              className={`input input-bordered bg-transparent w-full max-w-xs ${errors.amount && "input-error"}`}
            />
          </div>
        </div>
        <div className="w-full  flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h2>Recibes</h2>
            <TokenSymbol symbol={currencyOut.image} name={currencyOut.symbol} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {errors.price && <span className="text-red-500 label-text">Required</span>}
              <span className="label-text-alt">Precio de compra</span>
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              onChange={e => setData({ ...data, price: parseFloat(e.target.value) })}
              placeholder="3950"
              className={`input input-bordered bg-transparent w-full max-w-xs ${errors.price && "input-error"}`}
            />
          </div>
        </div>
      </div>
      <div className="stats bg-indigo-600">
        <div className="stat">
          <div className="stat-title">Vas a recibir</div>
          <div className="stat-value text-xl">
            {totalValue} {currencyOut.name}
          </div>
        </div>
      </div>
      <div className="divider" />
      <h2>Limites de compra</h2>
      <div className="flex flex-row  gap-4">
        <div className="form-control w-full max-w-xs">
          {errors.min && (
            <label className="label">
              <span className="text-red-500 label-text">Required</span>
            </label>
          )}
          <input
            {...register("min", { required: true })}
            type="number"
            placeholder="Min"
            className={`input input-bordered bg-transparent w-full max-w-xs ${errors.min && "input-error"}`}
          />
        </div>
        <div className="form-control w-full max-w-xs">
          {errors.max && (
            <label className="label">
              <span className="text-red-500 label-text">Required</span>
            </label>
          )}
          <input
            {...register("max", { required: true })}
            type="number"
            placeholder="Max"
            className={`input input-bordered bg-transparent w-full max-w-xs ${errors.max && "input-error"}`}
          />
        </div>
      </div>
      <div className="divider" />
      {children}
      <button className="btn btn-ghost bg-indigo-600">Crear orden</button>
    </form>
  );
};
export default BuyingSide;
