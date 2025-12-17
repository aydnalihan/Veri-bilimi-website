import React from 'react';

// Base skeleton animation class
const skeletonClass = "animate-pulse bg-slate-200 rounded";

// Event Card Skeleton
export function EventCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg shadow-slate-100">
      <div className={`h-48 mb-4 ${skeletonClass} rounded-2xl`} />
      <div className="flex justify-between items-start mb-2">
        <div className={`h-4 w-24 ${skeletonClass}`} />
      </div>
      <div className={`h-6 w-3/4 mb-2 ${skeletonClass}`} />
      <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
      <div className={`h-4 w-2/3 mb-6 ${skeletonClass}`} />
      <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
        <div className={`h-4 w-20 ${skeletonClass}`} />
        <div className={`h-4 w-16 ml-auto ${skeletonClass}`} />
      </div>
    </div>
  );
}

// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-8 border border-slate-100">
      <div className={`w-16 h-16 mb-6 ${skeletonClass} rounded-2xl`} />
      <div className={`h-3 w-20 mb-2 ${skeletonClass}`} />
      <div className={`h-6 w-3/4 mb-3 ${skeletonClass}`} />
      <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
      <div className={`h-4 w-2/3 mb-6 ${skeletonClass}`} />
      <div className="flex flex-wrap gap-2">
        <div className={`h-6 w-16 ${skeletonClass}`} />
        <div className={`h-6 w-20 ${skeletonClass}`} />
        <div className={`h-6 w-14 ${skeletonClass}`} />
      </div>
    </div>
  );
}

// Team Member Card Skeleton
export function TeamCardSkeleton() {
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-lg shadow-slate-100 text-center">
      <div className={`w-32 h-32 mx-auto mb-6 ${skeletonClass} rounded-full`} />
      <div className={`h-6 w-2/3 mx-auto mb-2 ${skeletonClass}`} />
      <div className={`h-4 w-1/2 mx-auto mb-2 ${skeletonClass}`} />
      <div className={`h-4 w-3/4 mx-auto mb-6 ${skeletonClass}`} />
      <div className={`h-4 w-24 mx-auto ${skeletonClass}`} />
    </div>
  );
}

// Stats Skeleton
export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="text-center">
          <div className={`h-8 w-8 mx-auto mb-1 ${skeletonClass} rounded`} />
          <div className={`h-6 w-12 mx-auto mb-1 ${skeletonClass}`} />
          <div className={`h-3 w-16 mx-auto ${skeletonClass}`} />
        </div>
      ))}
    </div>
  );
}

// Event Detail Skeleton
export function EventDetailSkeleton() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        <div className={`h-6 w-40 mb-8 ${skeletonClass}`} />
        <div className="text-center mb-10">
          <div className={`h-6 w-20 mx-auto mb-4 ${skeletonClass} rounded-full`} />
          <div className={`h-12 w-3/4 mx-auto mb-6 ${skeletonClass}`} />
          <div className="flex justify-center gap-6">
            <div className={`h-5 w-32 ${skeletonClass}`} />
            <div className={`h-5 w-32 ${skeletonClass}`} />
          </div>
        </div>
        <div className={`h-[400px] mb-12 ${skeletonClass} rounded-[2rem]`} />
        <div className="max-w-3xl mx-auto bg-white p-8 lg:p-12 rounded-[2rem] border border-slate-100">
          <div className={`h-6 w-full mb-4 ${skeletonClass}`} />
          <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
          <div className={`h-4 w-3/4 mb-8 ${skeletonClass}`} />
          <div className={`h-12 w-48 mx-auto ${skeletonClass} rounded-2xl`} />
        </div>
      </div>
    </div>
  );
}

// Project Detail Skeleton
export function ProjectDetailSkeleton() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <div className={`h-6 w-32 mb-8 ${skeletonClass}`} />
        <div className="bg-white rounded-2xl sm:rounded-[2.5rem] p-4 sm:p-8 lg:p-12 border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className={`w-24 h-24 mb-6 ${skeletonClass} rounded-3xl`} />
              <div className={`h-4 w-24 mb-2 ${skeletonClass}`} />
              <div className={`h-10 w-3/4 mb-6 ${skeletonClass}`} />
              <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
              <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
              <div className={`h-4 w-2/3 mb-8 ${skeletonClass}`} />
              <div className={`h-5 w-40 mb-4 ${skeletonClass}`} />
              <div className="flex flex-wrap gap-2 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-8 w-20 ${skeletonClass}`} />
                ))}
              </div>
              <div className="flex gap-4">
                <div className={`h-12 w-40 ${skeletonClass} rounded-xl`} />
                <div className={`h-12 w-28 ${skeletonClass} rounded-xl`} />
              </div>
            </div>
            <div className={`h-80 lg:h-full ${skeletonClass} rounded-3xl`} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Team Member Detail Skeleton
export function TeamDetailSkeleton() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
        <div className={`h-6 w-28 mb-12 ${skeletonClass}`} />
        <div className="bg-white rounded-[2rem] p-8 lg:p-16 border border-slate-100">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4">
              <div className={`aspect-square mb-8 ${skeletonClass} rounded-3xl`} />
              <div className={`h-4 w-32 mb-3 ${skeletonClass}`} />
              <div className="flex gap-3 mb-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-12 h-12 ${skeletonClass} rounded-xl`} />
                ))}
              </div>
              <div className={`h-4 w-24 mb-3 ${skeletonClass}`} />
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-8 w-20 ${skeletonClass} rounded-lg`} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className={`h-6 w-24 mb-4 ${skeletonClass} rounded-full`} />
              <div className={`h-14 w-3/4 mb-4 ${skeletonClass}`} />
              <div className={`h-6 w-48 mb-8 ${skeletonClass}`} />
              <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
              <div className={`h-4 w-full mb-2 ${skeletonClass}`} />
              <div className={`h-4 w-2/3 mb-8 ${skeletonClass}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid of skeletons helper
export function SkeletonGrid({ count = 3, SkeletonComponent }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </>
  );
}

export default {
  EventCardSkeleton,
  ProjectCardSkeleton,
  TeamCardSkeleton,
  StatsSkeleton,
  EventDetailSkeleton,
  ProjectDetailSkeleton,
  TeamDetailSkeleton,
  SkeletonGrid,
};

