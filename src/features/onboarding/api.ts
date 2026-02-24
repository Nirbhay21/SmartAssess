import { authApi } from '@/features/auth/api';
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
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Trigger RTK Query to refetch /api/me and wait for it to reflect completion
          const maxAttempts = 6;
          const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
          let confirmed = false;
          for (let i = 0; i < maxAttempts; i++) {
            try {
              const result = await dispatch(
                // forceRefetch to ensure fresh data from the server
                authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }),
              ).unwrap();
              if (result.onboardingStatus === 'completed') {
                confirmed = true;
                break;
              }
            } catch {
              // ignore and retry
            }
            await delay(500);
          }
          // final non-blocking fetch as a fallback
          if (!confirmed) {
            try {
              dispatch(authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }));
            } catch {}
          }
        } catch {
          // ignore
        }
      },
    }),
  }),
});

export const {
  useGetOnboardingStatusQuery,
  useUpdateOnboardingStatusMutation,
  useCompleteOnboardingMutation,
} = onboardingApi;
