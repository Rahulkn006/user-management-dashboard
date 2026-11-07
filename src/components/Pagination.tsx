
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPrevious: () => void
  onNext: () => void
}

function Pagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3">

      <button
        type="button"
        onClick={onPrevious}
        disabled={currentPage === 1}
        className="rounded-xl border border-[#DFE6DC] bg-white px-4 py-2.5 text-sm font-semibold text-[#365442] transition hover:bg-[#EAF0E5] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#DCE8DF] dark:hover:bg-[#2C4036]"
      >
        ← Previous
      </button>

      <span className="rounded-xl bg-[#E6EDE1] px-4 py-2.5 text-sm font-bold text-[#315440] dark:bg-[#2C4536] dark:text-[#DCE8DF]">
        {currentPage} / {totalPages}
      </span>

      <button
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
        className="rounded-xl border border-[#DFE6DC] bg-white px-4 py-2.5 text-sm font-semibold text-[#365442] transition hover:bg-[#EAF0E5] disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#DCE8DF] dark:hover:bg-[#2C4036]"
      >
        Next →
      </button>

    </div>
  )
}

export default Pagination
