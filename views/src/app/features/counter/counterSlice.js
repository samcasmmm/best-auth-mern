import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  isPositive: true,
  isEven: true,
};

const updateIsEven = (state) => {
  state.isEven = state.value % 2 === 0;
  state.isPositive = state.value >= 0;
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      updateIsEven(state);
      console.log('pos', state.isPositive);
      console.log('eve', state.isEven);
    },
    decrement: (state) => {
      state.value -= 1;
      updateIsEven(state);
      console.log('pos', state.isPositive);
      console.log('eve', state.isEven);
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
      updateIsEven(state);
    },
    reset: (state) => {
      state.value = 0;
      updateIsEven(state);
    },
  },
});

export const selectCount = (state) => state.counter.value;
export const selectIsPositive = (state) => state.counter.isPositive;
export const selectIsEven = (state) => state.counter.isEven;

export const { increment, decrement, incrementByAmount, reset } =
  counterSlice.actions;

export default counterSlice.reducer;
