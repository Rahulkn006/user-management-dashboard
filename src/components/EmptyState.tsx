
function EmptyState() {
  return (
    <section
      className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center dark:border-[#405548] dark:bg-[#17251D]"
      aria-label="No matching users"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl text-slate-400 dark:bg-[#26382D] dark:text-[#A4B4AA]">
        ⌕
      </div>

      <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-[#E8EEE9]">
        No users found
      </h2>

      <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-[#A4B4AA]">
        We couldn't find any users matching your search or filters.
        Try a different name, username, email or filter selection.
      </p>
    </section>
  )
}

export default EmptyState
