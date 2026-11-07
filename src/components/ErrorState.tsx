
interface ErrorStateProps {
  message: string
  onRetry: () => void
}

function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900/60 dark:bg-[#2A1C1D]"
    >
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-2xl text-red-600 dark:bg-[#48292B] dark:text-[#FCA5A5]">
        !
      </div>

      <h2 className="mt-4 text-xl font-bold text-red-900 dark:text-[#FECACA]">
        Unable to load users
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm text-red-700 dark:text-[#FCA5A5]">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-6 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900/60"
      >
        Try again
      </button>
    </section>
  )
}

export default ErrorState
