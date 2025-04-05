import { Skeleton } from "@/components/ui/skeleton";

export default function BlogCardSkeleton() {
  return (
    <div className="ring-1 ring-slate-200 dark:ring-slate-800 px-3 py-3 rounded-lg w-full">
      <Skeleton className="w-full aspect-[16/9] rounded-lg" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-2 h-6 w-1/2" />

      <div className="mt-4 flex items-center gap-x-3">
        <Skeleton className="w-8 h-8 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    </div>
  );
}
