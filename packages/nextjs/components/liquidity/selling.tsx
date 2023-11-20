import { useEffect, useState } from "react";
import { Currency } from "../currencies";
import { SubmitHandler, useForm } from "react-hook-form";
import Token from "~~/components/main/Token";

type Inputs = {
  amount: number;
  price: number;
  min: number;
  max: number;
};

type SellingSideProps = {
  children: React.ReactNode;
  currencyIn: Currency;
  currencyOut: Currency;
};

function formatCurrency(value: number, locale: string = "en-US", currency: string = "COP"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
}

const SellingSide: React.FC<SellingSideProps> = ({ children, currencyIn, currencyOut }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const [totalValue, setTotalValue] = useState("0$");
  const [data, setData] = useState({
    amount: 0,
    price: 0,
  });

  useEffect(() => {
    if (errors.amount || errors.price) {
      return;
    }
    if (!data.amount || !data.price || Number.isNaN(data.amount) || Number.isNaN(data.price)) {
      setTotalValue("0$");
      return;
    }
    setTotalValue(formatCurrency(data.amount * data.price));
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
            <Token icon={currencyIn.icon} name={currencyIn.symbol} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {errors.amount && <span className="text-red-500 label-text">Required</span>}
              <span className="label-text-alt">Cuanto vas a vender?</span>
            </label>
            <input
              {...register("amount", { required: true })}
              onChange={e => setData({ ...data, amount: parseFloat(e.target.value) })}
              placeholder="0"
              type="number"
              className={`input input-bordered bg-transparent w-full max-w-xs ${errors.amount && "input-error"}`}
            />
          </div>
        </div>
        <div className="w-full  flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h2>Recibes</h2>
            <Token icon={currencyOut.icon} name={currencyOut.symbol} />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {errors.price && <span className="text-red-500 label-text">Required</span>}
              <span className="label-text-alt">Precio de venta</span>
            </label>

            <input
              {...register("price", { required: true })}
              type="number"
              onChange={e => setData({ ...data, price: parseFloat(e.target.value) })}
              placeholder="3950 COP"
              className={`input input-bordered bg-transparent w-full max-w-xs ${errors.price && "input-error"}`}
            />
          </div>
        </div>
      </div>
      <div className="stats bg-indigo-600">
        <div className="stat">
          <div className="stat-title">Vas a recibir</div>
          <div className="stat-value text-xl">{totalValue}</div>
        </div>
      </div>
      <div className="divider" />
      <h2>Rango</h2>
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
export default SellingSide;
