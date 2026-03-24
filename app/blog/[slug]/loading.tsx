import { Skeleton } from "@/components/atoms/skeleton"

export default function Loading() {
  return (
    <div className="container max-w-3xl py-10 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
        </div>
        <Skeleton className="h-12 w-full leading-tight" />
        <div className="flex items-center gap-4 border-b pb-8">
           <Skeleton className="h-10 w-10 rounded-full" />
           <div className="space-y-1">
             <Skeleton className="h-4 w-32" />
             <Skeleton className="h-3 w-24" />
           </div>
        </div>
      </div>
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-6 max-w-none">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[98%]" />
        <Skeleton className="h-4 w-[95%]" />
        <Skeleton className="h-4 w-[99%]" />
        <Skeleton className="h-4 w-[90%]" />
        <div className="h-4" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[96%]" />
        <Skeleton className="h-4 w-[85%]" />
      </div>
    </div>
  )
}
