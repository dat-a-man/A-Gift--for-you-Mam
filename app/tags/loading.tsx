import { Skeleton } from "@/components/atoms/skeleton"

export default function Loading() {
  return (
    <div className="container py-10 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-[100px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 15 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-full" />
        ))}
      </div>
    </div>
  )
}
