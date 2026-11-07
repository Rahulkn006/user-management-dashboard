
import { memo } from 'react'
import type { User } from '../types/user'
import UserCard from './UserCard'

interface UserGridProps {
  users: User[]
  favoriteIds: number[]
  onToggleFavorite: (userId: number) => void
}

function UserGrid({
  users,
  favoriteIds,
  onToggleFavorite,
}: UserGridProps) {
  return (
    <section
      aria-label="User list"
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          isFavorite={favoriteIds.includes(user.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default memo(UserGrid)
