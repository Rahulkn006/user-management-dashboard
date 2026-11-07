
import type { User } from '../types/user'

import type {
  SortField,
  SortDirection,
} from '../types/sorting'

export function sortUsers(
  users: User[],
  field: SortField,
  direction: SortDirection,
): User[] {

  // Create a copy so the original array is not modified
  const sortedUsers = [...users]

  // Sort the copied array
  sortedUsers.sort((a, b) => {

    const first = a[field].toLowerCase()
    const second = b[field].toLowerCase()

    const result = first.localeCompare(second)

    // Ascending or descending
    return direction === 'asc' ? result : -result
  })

  return sortedUsers
}
