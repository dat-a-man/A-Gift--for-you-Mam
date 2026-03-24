import { Skeleton } from "@/components/atoms/skeleton"

export default function Loading() {
  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-4 h-full">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-2 flex-1">
               <div className="flex gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
               </div>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
            <div className="flex items-center gap-2 pt-4">
               <Skeleton className="h-8 w-8 rounded-full" />
               <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
