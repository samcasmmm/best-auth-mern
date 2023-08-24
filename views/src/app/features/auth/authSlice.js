import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
};

const authSlices = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = '';
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logout } = authSlices.actions;

export const selectUserInfo = (state) => state.auth.userInfo;

export default authSlices.reducer;
