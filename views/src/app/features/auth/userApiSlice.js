import { apiSlice } from '../../apiSlice';
const USER_URL = '/api/v2/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation } =
  userApiSlice;
