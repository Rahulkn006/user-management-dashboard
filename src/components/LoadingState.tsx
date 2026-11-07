
function LoadingState() {
  return (
    <section
      aria-label="Loading users"
      aria-busy="true"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-slate-200 bg-white p-5 dark:border-[#34493E] dark:bg-[#1B2A23]"
        >

          {/* User heading skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-slate-200 dark:bg-[#34493E]" />

            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-[#34493E]" />
              <div className="h-3 w-1/2 rounded bg-slate-100 dark:bg-[#2A3A30]" />
            </div>
          </div>

          {/* User details skeleton */}
          <div className="mt-6 space-y-4">
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-[#2A3A30]" />
            <div className="h-3 w-4/5 rounded bg-slate-100 dark:bg-[#2A3A30]" />
            <div className="h-3 w-3/4 rounded bg-slate-100 dark:bg-[#2A3A30]" />
            <div className="h-3 w-2/3 rounded bg-slate-100 dark:bg-[#2A3A30]" />
          </div>

          {/* Button skeleton */}
          <div className="mt-6 h-10 rounded-xl bg-slate-200 dark:bg-[#34493E]" />

        </div>
      ))}
    </section>
  )
}

export default LoadingState
