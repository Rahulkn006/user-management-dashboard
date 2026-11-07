function Footer() {
  return (
    <footer className="mt-8 border-t border-[#E1E7DD] bg-white dark:border-[#2c4036] dark:bg-[#111d17]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-center">
        <p className="text-xs text-[#7D8B80] dark:text-[#a4b4aa]">
          © {new Date().getFullYear()} People Directory
        </p>

        <p className="text-xs text-[#7D8B80] dark:text-[#a4b4aa]">
          Built with React, TypeScript and Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

export default Footer