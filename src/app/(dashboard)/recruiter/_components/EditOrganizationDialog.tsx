'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Step1 from '@/app/(onboarding)/recruiter/onboarding/Step1';
import Step2 from '@/app/(onboarding)/recruiter/onboarding/Step2';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useUpdateRecruiterProfileMutation } from '@/features/recruiter/profile/api';
import { RecruiterProfileResponse } from '@/features/recruiter/profile/types';
import {
  recruiterOrganizationPartialSchema,
  RecruiterOrganizationUpdateData,
} from '@/lib/validation/recruiter/organization.schema';

interface EditOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile?: RecruiterProfileResponse;
}

export default function EditOrganizationDialog({
  open,
  onOpenChange,
  profile,
}: EditOrganizationDialogProps) {
  const [updateProfile, { isLoading: isUpdating }] = useUpdateRecruiterProfileMutation();

  // local status: idle | saving | success
  const [status, setStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  // form uses partial schema since we only update some fields
  const form = useForm<RecruiterOrganizationUpdateData>({
    resolver: zodResolver(recruiterOrganizationPartialSchema),
    defaultValues: {
      organizationName: '',
      organizationSize: '',
      industry: '',
      countryCode: '',
      hiringDomains: [],
      experienceLevels: [],
      organizationWebsite: '',
    },
  });

  // handler extracted from onSubmit
  async function handleSave(data: RecruiterOrganizationUpdateData) {
    try {
      setStatus('saving');
      await updateProfile(data).unwrap();
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        onOpenChange(false);
      }, 1200);
    } catch (err) {
      console.error('update failed', err);
      setStatus('idle');
    }
  }

  useEffect(() => {
    if (profile) {
      const {
        organizationName,
        organizationSize,
        industry,
        countryCode,
        organizationWebsite,
        hiringDomains,
        experienceLevels,
      } = profile;
      form.reset({
        organizationName,
        organizationSize,
        industry,
        countryCode,
        organizationWebsite: organizationWebsite ?? '',
        hiringDomains: hiringDomains ?? [],
        experienceLevels: experienceLevels ?? [],
      });
    }
  }, [profile, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-h-[80vh] overflow-auto p-8 sm:max-w-2xl"
        aria-describedby="edit-org-desc"
      >
        <DialogHeader>
          <DialogTitle>Edit Organization</DialogTitle>
          <DialogDescription id="edit-org-desc">
            Update your organization details and hiring preferences below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
          <h3 className="text-sm font-medium">Basic Information</h3>
          <Step1 form={form} isLoading={false} />
          <hr />
          <h3 className="text-sm font-medium">Hiring Preferences</h3>
          <Step2 form={form} isLoading={false} />
          <DialogFooter className="mt-8 flex space-x-1.5">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUpdating}>
              {isUpdating && <Spinner className="size-4" />}
              {status === 'success' && <CheckCircle2 className="size-4" />}
              {status === 'saving' ? 'Saving...' : status === 'success' ? 'Saved' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
