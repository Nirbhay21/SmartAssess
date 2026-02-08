import { z } from 'zod';

export const candidateOnboardingSchema = z.object({
  // step 1 - basic info
  domain: z.string().min(1, 'Domain / Industry is required'),
  primaryRole: z.string().min(1, 'Primary role is required'),
  highestEducation: z.string().min(1, 'Highest education level is required'),
  currentStatus: z.string().min(1, 'Current status is required'),

  // step 2 - skills & experience
  topSkills: z.array(z.string().min(1)).min(1, 'At least one skill is required'),
  yearsOfExperience: z.string().min(1, 'Years of experience is required'),
  professionalBio: z.string().min(20, 'Professional bio must be at least 20 characters'),

  // step 3 - location & presence
  country: z.string().min(1, 'Country is required'),
  portfolioUrl: z.url('Invalid portfolio URL').optional().or(z.literal('')),
  githubUrl: z.url('Invalid GitHub URL').optional().or(z.literal('')),
  linkedinUrl: z.url('Invalid LinkedIn profile URL').optional().or(z.literal('')),
});

export type CandidateOnboardingData = z.infer<typeof candidateOnboardingSchema>;
