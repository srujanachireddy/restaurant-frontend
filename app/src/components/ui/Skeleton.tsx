import { cn } from "../../utils/cn";

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse bg-stone-200 rounded-xl", className)} />
);

export const MenuCardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden border border-stone-100">
    <Skeleton className="h-44 rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="flex justify-between pt-2">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  </div>
);
