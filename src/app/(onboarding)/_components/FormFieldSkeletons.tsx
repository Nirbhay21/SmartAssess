import { Skeleton } from '@/components/ui/skeleton';

/**
 * Field skeleton for loading states in form fields
 * Matches the height and styling of combobox/input components
 */
export function FieldSkeleton() {
  return <Skeleton className="h-9 w-full rounded-md" />;
}

/**
 * Textarea skeleton for loading states
 * Taller to match textarea component
 */
export function TextareaSkeleton() {
  return <Skeleton className="h-24 w-full rounded-md" />;
}

/**
 * Multiple selector skeleton for loading states
 * Matches the MultipleSelector component height
 */
export function MultipleSelectorSkeleton() {
  return <Skeleton className="h-10 w-full rounded-md" />;
}
