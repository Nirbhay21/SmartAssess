import { z } from 'zod';

export const candidateOnboardingSchema = z.object({
  // step 1 - basic info
  domain: z.string().min(1, 'Domain / Industry is required'),
  primaryRole: z.string().min(1, 'Primary role is required'),
  highestEducation: z.string().min(1, 'Highest education level is required'),
  currentStatus: z.string().min(1, 'Current status is required'),

  // step 2 - skills & experience
  topSkills: z
    .array(z.string().min(1, 'Skill is required').max(50, 'Skill must be at most 50 characters'))
    .min(1, 'At least one skill is required')
    .max(25, 'You can add up to 25 skills'),
  yearsOfExperience: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.enum(['0', '0-1', '1-2', '2-3', '3-5', '5-7', '7-10', '10+'], {
      message: 'Select years of experience',
    }),
  ),
  professionalBio: z.string().min(20, 'Professional bio must be at least 20 characters'),

  // step 3 - location & presence
  country: z.string().min(1, 'Country is required'),
  portfolioUrl: z.url('Invalid portfolio URL').optional().or(z.literal('')),
  githubUrl: z.url('Invalid GitHub URL').optional().or(z.literal('')),
  linkedinUrl: z.url('Invalid LinkedIn profile URL').optional().or(z.literal('')),
});

export type CandidateOnboardingData = z.infer<typeof candidateOnboardingSchema>;
