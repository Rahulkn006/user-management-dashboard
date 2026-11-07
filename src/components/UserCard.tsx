
import { memo } from 'react'
import { Link } from 'react-router'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

function UserCard({ user, isFavorite, onToggleFavorite }: UserCardProps) {
  const initials = user.name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()
  const website = user.website.startsWith('http') ? user.website : `https://${user.website}`

  return (
    <article className="flex h-full flex-col rounded-2xl border border-[#E1E8DE] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-[#34493E] dark:bg-[#1B2A23] dark:shadow-black/20 dark:hover:bg-[#203229]">

      <div className="flex items-center justify-between border-b border-[#EDF1EA] pb-4 dark:border-[#34493E]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF0E4] font-bold text-[#315640] dark:bg-[#2C4536] dark:text-[#DCE8DF]">
            {initials}
          </div>
          <div>
            <h2 className="font-bold text-[#233A2E] dark:text-[#E8EEE9]">{user.name}</h2>
            <p className="text-sm text-[#788B7C] dark:text-[#A4B4AA]">@{user.username}</p>
          </div>
        </div>

        <button
          onClick={() => onToggleFavorite(user.id)}
          aria-label={
            isFavorite
              ? `Remove ${user.name} from favorites`
              : `Add ${user.name} to favorites`
          }
          aria-pressed={isFavorite}
          className="h-10 w-10 rounded-full border border-[#E3EAE0] bg-[#F8FAF6] text-xl text-[#A48D51] transition hover:bg-[#FBF6E8] dark:border-[#3A5144] dark:bg-[#24352B] dark:hover:bg-[#354638]"
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="flex-1 space-y-4 py-4 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#91A094] dark:text-[#9CAF9F]">Email</p>
          <a href={`mailto:${user.email}`} className="break-all text-[#43594A] dark:text-[#D0DFD3] hover:underline">
            {user.email}
          </a>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#91A094] dark:text-[#9CAF9F]">Phone</p>
          <p className="text-[#43594A] dark:text-[#D0DFD3]">{user.phone}</p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#91A094] dark:text-[#9CAF9F]">Website</p>
          <a href={website} target="_blank" rel="noopener noreferrer" className="break-all text-[#456F52] hover:underline dark:text-[#9BC5A8]">
            {user.website}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-[#EDF1EA] pt-3 dark:border-[#34493E]">
          <div>
            <p className="text-xs font-semibold uppercase text-[#91A094] dark:text-[#9CAF9F]">Company</p>
            <p className="break-words font-medium text-[#354B3C] dark:text-[#DCE8DF]">{user.company.name}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase text-[#91A094] dark:text-[#9CAF9F]">Location</p>
            <p className="break-words font-medium text-[#354B3C] dark:text-[#DCE8DF]">{user.address.city}</p>
          </div>
        </div>
      </div>

      <Link
        to={`/users/${user.id}`}
        className="flex items-center justify-between rounded-xl bg-[#234A37] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#19382F] dark:bg-[#DCE9C5] dark:text-[#19382F] dark:hover:bg-[#C5D9AE]"
      >
        View profile <span>→</span>
      </Link>

    </article>
  )
}

export default memo(UserCard)
