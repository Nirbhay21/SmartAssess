import { baseApi } from '@/services/api/baseApi';

import { RecruiterProfileResponse } from './types';

export const recruiterProfileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecruiterProfile: builder.query<RecruiterProfileResponse, void>({
      query: () => '/recruiter/profile',
      providesTags: ['RecruiterProfile'],
    }),
    updateRecruiterProfile: builder.mutation<
      RecruiterProfileResponse,
      Partial<RecruiterProfileResponse>
    >({
      query: (body) => ({
        url: '/recruiter/organization',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['RecruiterProfile'],
    }),
  }),
});

export const { useGetRecruiterProfileQuery, useUpdateRecruiterProfileMutation } =
  recruiterProfileApi;
