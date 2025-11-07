"use client"

import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-slate-200 dark:bg-slate-700", className)}
      {...props}
    />
  )
}

export function ServiceCardSkeleton() {
  return (
    <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700">
      <Skeleton className="w-12 h-12 rounded-lg mb-6" />
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  )
}

export function GalleryItemSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg h-80">
      <Skeleton className="w-full h-full" />
      <div className="absolute bottom-6 left-6">
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  )
}