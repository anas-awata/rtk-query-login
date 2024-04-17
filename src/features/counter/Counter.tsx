import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { decrement, increment, incrementByAmount } from "./counterSlice";

type Props = {};

function Counter({}: Props) {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const [incrementAmount, setIncrementAmount] = useState(0);

  return (
    <section>
      <p>{count}</p>
      <div>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
      </div>
      <input
        type="number"
        value={incrementAmount}
        onChange={(e) => {
          setIncrementAmount(Number(e.target.value) || 0);
        }}
      />
      <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
        Add Amount
      </button>
    </section>
  );
}

export default Counter;
