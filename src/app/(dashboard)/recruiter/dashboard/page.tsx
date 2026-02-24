'use client';
import { SidebarInset } from '@/components/ui/sidebar';
import { useGetRecruiterProfileQuery } from '@/features/recruiter/profile/api';

export default function RecruiterDashboardPage() {
  const { data, isLoading, isError } = useGetRecruiterProfileQuery();

  console.log(data);

  return <SidebarInset></SidebarInset>;
}
