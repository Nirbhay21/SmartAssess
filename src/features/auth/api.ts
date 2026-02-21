import { baseApi } from '@/services/api/baseApi';

import { MeResponse } from './types';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => '/me',
    }),
  }),
});

export const { useGetMeQuery } = authApi;
