'use client';
import { formatDistanceToNow } from 'date-fns';
import { Building2Icon, PencilIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { COUNTRY_OPTIONS } from '@/constants/onboarding-form';
import { useGetRecruiterProfileQuery } from '@/features/recruiter/profile/api';
import { cn } from '@/lib/utils';

import EditOrganizationDialog from '../_components/EditOrganizationDialog';

export default function RecruiterOrganizationPage() {
  const { data: profile, isLoading } = useGetRecruiterProfileQuery();
  const [showEdit, setShowEdit] = useState(false);

  const fieldDefinitions = [
    { label: 'Organization Name', value: profile?.organizationName },
    { label: 'Industry', value: profile?.industry },
    { label: 'Organization Size', value: profile?.organizationSize },
    {
      label: 'Country',
      value: profile?.countryCode
        ? (() => {
            const entry = COUNTRY_OPTIONS.find((c) => c.value === profile.countryCode);
            if (!entry) return profile.countryCode;
            const flagUrl = `https://flagcdn.com/w80/${entry.value.toLowerCase()}.jpg`;
            return (
              <div className="flex items-center gap-2">
                <Image
                  src={flagUrl}
                  alt=""
                  width={32}
                  height={20}
                  className="shrink-0"
                  style={{ width: '32px', height: '20px' }}
                  unoptimized
                />
                {entry.label}
              </div>
            );
          })()
        : '-',
    },
    {
      label: 'Website',
      value: profile?.organizationWebsite ? (
        <Link
          href={profile.organizationWebsite}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline"
        >
          {profile.organizationWebsite}
        </Link>
      ) : (
        '-'
      ),
    },
    {
      label: 'Hiring Domains',
      value: profile?.hiringDomains ? (
        <div className="flex flex-wrap gap-2">
          {profile.hiringDomains.map((domain) => (
            <Badge key={domain} variant="outline">
              {domain}
            </Badge>
          ))}
        </div>
      ) : null,
    },
    {
      label: 'Experience Levels',
      value: profile?.experienceLevels ? (
        <div className="flex flex-wrap gap-2">
          {profile.experienceLevels.map((level) => (
            <Badge key={level} variant="outline">
              {level}
            </Badge>
          ))}
        </div>
      ) : null,
    },
    { label: 'LLM Provider', value: profile?.llmProvider },
    { label: 'Default Model', value: profile?.defaultModel },
    {
      label: 'Profile created at',
      value: profile?.createdAt
        ? formatDistanceToNow(new Date(profile.createdAt), { addSuffix: true })
        : 'N/A',
    },
    {
      label: 'Profile updated at',
      value: profile?.updatedAt
        ? formatDistanceToNow(new Date(profile.updatedAt), { addSuffix: true })
        : 'N/A',
    },
  ] as const;

  // skeleton configuration with type information for layout
  // each skeleton entry can define custom widths to mirror the eventual
  // label/value sizes seen in the real profile. widths are Tailwind classes.
  const skeletonFields: {
    label: string;
    type: 'text' | 'tags' | 'country';
    labelWidth?: string;
    valueWidth?: string;
  }[] = [
    { label: 'Organization Name', type: 'text', labelWidth: 'w-34', valueWidth: 'w-26' },
    { label: 'Industry', type: 'text', labelWidth: 'w-20', valueWidth: 'w-40' },
    { label: 'Organization Size', type: 'text', labelWidth: 'w-36', valueWidth: 'w-48' },
    { label: 'Country', type: 'country', labelWidth: 'w-24', valueWidth: 'w-46' },
    { label: 'Website', type: 'text', labelWidth: 'w-24', valueWidth: 'w-46' },
    { label: 'Hiring Domains', type: 'tags', labelWidth: 'w-32', valueWidth: 'w-64' },
    { label: 'Experience Levels', type: 'tags', labelWidth: 'w-40', valueWidth: 'w-64' },
    { label: 'LLM Provider', type: 'text', labelWidth: 'w-24', valueWidth: 'w-44' },
    { label: 'Default Model', type: 'text', labelWidth: 'w-24', valueWidth: 'w-42' },
    { label: 'Profile created at', type: 'text', labelWidth: 'w-34', valueWidth: 'w-40' },
    { label: 'Profile updated at', type: 'text', labelWidth: 'w-36', valueWidth: 'w-42' },
  ];

  return (
    <div>
      <Card className="mx-6 mt-6 gap-0 py-0 shadow-xs">
        <CardHeader className="flex justify-between border-b py-3 [.border-b]:pb-3">
          <div className="flex items-center space-x-3">
            <Building2Icon className="bg-primary/20 h-8.5 w-8.5 rounded-sm p-1.5" />
            <h2 className="font-montserrat text-lg font-semibold">Organization Profile</h2>
          </div>
          <Button variant="outline" onClick={() => setShowEdit(true)}>
            <PencilIcon />
            <span>Edit</span>
          </Button>

          {/* edit form dialog */}
          <EditOrganizationDialog open={showEdit} onOpenChange={setShowEdit} profile={profile} />
        </CardHeader>
        <CardContent className="py-4">
          <div
            className={cn(
              'relative grid gap-y-0.5 lg:grid-cols-[220px_1fr] lg:gap-y-4',
              isLoading && 'gap-y-1.5 lg:gap-y-5',
            )}
          >
            {isLoading
              ? skeletonFields.map((f) => (
                  <Fragment key={f.label}>
                    <div>
                      <Skeleton className={`h-5 ${f.labelWidth ?? 'w-40'}`} />
                    </div>
                    <div className={cn(isLoading && 'mb-3 lg:mb-0')}>
                      {f.type === 'text' && (
                        <Skeleton className={`h-5 ${f.valueWidth ?? 'w-full'}`} />
                      )}
                      {f.type === 'country' && (
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-7 w-12 rounded-none" />
                          <Skeleton className={`h-5 ${f.valueWidth ?? 'w-48'}`} />
                        </div>
                      )}
                      {f.type === 'tags' && (
                        <div className="flex gap-2">
                          <Skeleton className="h-5 w-30 rounded-full" />
                          <Skeleton className="h-5 w-18 rounded-full" />
                          <Skeleton className="h-5 w-38 rounded-full" />
                        </div>
                      )}
                    </div>
                  </Fragment>
                ))
              : fieldDefinitions.map((field) => (
                  <Fragment key={field.label}>
                    <p>{field.label}</p>
                    <div className="text-muted-foreground mb-2.5 lg:mb-0">{field.value}</div>
                  </Fragment>
                ))}
            <div className="bg-border absolute left-45 hidden h-full w-px lg:block"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
