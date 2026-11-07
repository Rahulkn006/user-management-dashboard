import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F6F0] text-center dark:bg-[#101A15]">

      <h1 className="text-6xl font-bold text-[#234A37] dark:text-[#9BC5A8]">
        404
      </h1>

      <h2 className="mt-4 text-2xl font-bold text-[#243B30] dark:text-[#E8EEE9]">
        Page Not Found
      </h2>

      <p className="mt-2 text-slate-500 dark:text-[#A4B4AA]">
        The page you are looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-[#234A37] px-5 py-3 text-white hover:bg-[#19382F] dark:bg-[#DCE9C5] dark:text-[#19382F] dark:hover:bg-[#C5D9AE]"
      >
        Back to Dashboard
      </Link>

    </div>
  )
}

export default NotFoundPage