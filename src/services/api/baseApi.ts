import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { publicEnv } from '@/lib/publicEnv';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['OnboardingStatus'],
  baseQuery: fetchBaseQuery({
    baseUrl: publicEnv.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include', // Include cookies in requests
  }),
  endpoints: () => ({}),
});
