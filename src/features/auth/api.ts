import { baseApi } from '@/services/api/baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<unknown, void>({
      query: () => '/me',
    }),
  }),
});

export const { useGetMeQuery } = authApi;
