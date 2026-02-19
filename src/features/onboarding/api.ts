import { baseApi } from '@/services/api/baseApi';

import {
  CompletedOnboardingPayload,
  CompleteOnboardingResponse,
  OnboardingStatusResponse,
  UpdateOnboardingStatusPayload,
  UpdateOnboardingStatusResponse,
} from './types.js';

export const onboardingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOnboardingStatus: builder.query<OnboardingStatusResponse, void>({
      query: () => '/onboarding',
      providesTags: ['OnboardingStatus'],
    }),
    updateOnboardingStatus: builder.mutation<
      UpdateOnboardingStatusResponse,
      UpdateOnboardingStatusPayload
    >({
      query: (body) => ({
        url: '/onboarding',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['OnboardingStatus'],
    }),
    completeOnboarding: builder.mutation<CompleteOnboardingResponse, CompletedOnboardingPayload>({
      query: (body) => ({
        url: '/onboarding/complete',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['OnboardingStatus'],
    }),
  }),
});

export const {
  useGetOnboardingStatusQuery,
  useUpdateOnboardingStatusMutation,
  useCompleteOnboardingMutation,
} = onboardingApi;
