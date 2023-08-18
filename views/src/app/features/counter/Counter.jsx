import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrement,
  increment,
  reset,
  incrementByAmount,
  selectCount,
  selectIsPositive,
  selectIsEven,
} from './counterSlice';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(selectCount);
  const isPositive = useSelector(selectIsPositive);
  const isEven = useSelector(selectIsEven);
  const [amount, setAmount] = useState(0);

  return (
    <div className='w-screen flex items-center justify-center flex-col gap-5'>
      <div className='flex flex-row gap-3'>
        {' '}
        <p className='text-lg font-bold text-teal-500 p-5 rounded-lg bg-slate-100'>
          {count}
        </p>
        <p className='text-lg font-bold text-teal-500 p-5 rounded-lg bg-slate-100'>
          {isEven ? 'Even' : 'Odd'}
        </p>
        <p className='text-lg font-bold text-teal-500 p-5 rounded-lg bg-slate-100'>
          {isPositive ? 'Positive' : 'Negitive'}
        </p>
      </div>
      <input
        type='text'
        placeholder='counter'
        className='border-blue-100 bg-slate-100 border-2 p-2 rounded-lg outline-blue-400'
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <div className='flex flex-row gap-3'>
        <button
          className='bg-blue-500 text-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 duration-200 ease-in-out'
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          className='bg-blue-500 text-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 duration-200 ease-in-out'
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          className='bg-blue-500 text-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 duration-200 ease-in-out'
          onClick={() => dispatch(reset())}
        >
          Reset
        </button>
        <button
          className='bg-blue-500 text-center px-4 py-2 rounded-lg text-white hover:bg-blue-700 duration-200 ease-in-out'
          onClick={() => dispatch(incrementByAmount(parseInt(amount)))}
        >
          Update by Amount
        </button>
      </div>
    </div>
  );
};

export default Counter;
