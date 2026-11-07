
import type { User } from '../types/user'

// Number of users displayed on each page
export const USERS_PER_PAGE = 5

// Get users for the selected page
export function paginateUsers(
  users: User[],
  currentPage: number,
): User[] {

  const safePage = Math.max(1, currentPage)

  // Calculate starting position
  const startIndex = (safePage - 1) * USERS_PER_PAGE

  // Return only five users
  return users.slice(
    startIndex,
    startIndex + USERS_PER_PAGE,
  )
}

// Calculate total number of pages
export function getTotalPages(totalUsers: number): number {

  return Math.max(
    1,
    Math.ceil(totalUsers / USERS_PER_PAGE),
  )
}
