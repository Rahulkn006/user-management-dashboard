
import { useState, useEffect } from 'react'

interface HeaderProps {
  favoriteCount: number
}

function Header({ favoriteCount }: HeaderProps) {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem('people-theme') === 'dark'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)

    localStorage.setItem('people-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <header className="border-b border-[#29483D] bg-[#19382F] text-white dark:border-[#263B30] dark:bg-[#101B16]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCE9C5] font-bold text-[#19382F]">
            PD
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-widest text-[#B8C9BE]">
              WORKSPACE / DIRECTORY
            </p>
            <h1 className="text-lg font-bold">
              People Directory
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4">

          {/* Dark Mode Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={isDark}
            aria-label="Toggle dark mode"
            onClick={() => setIsDark(!isDark)}
            className="flex items-center gap-2 text-sm text-white"
          >
            <span className={`relative h-6 w-11 rounded-full transition-colors ${
              isDark ? 'bg-[#DCE9C5]' : 'bg-white/20'
            }`}>
              <span className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </span>

            <span>{isDark ? 'Dark' : 'Light'}</span>
          </button>

          {/* Favorites */}
          <div className="rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-semibold">
            <span className="text-[#DCE9C5]">★</span>
            {' '}{favoriteCount} saved
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
