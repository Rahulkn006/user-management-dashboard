
import {
  paginateUsers,
  getTotalPages,
  USERS_PER_PAGE,
} from './pagination'

import type { User } from '../types/user'

// Create sample users
function createUser(id: number): User {
  return {
    id,
    name: `User ${id}`,
    username: `user${id}`,
    email: `user${id}@example.com`,
    phone: '123456789',
    website: 'example.com',
    address: {
      street: 'Main Street',
      suite: 'Apt 1',
      city: 'Bangalore',
      zipcode: '560001',
      geo: { lat: '12.97', lng: '77.59' },
    },
    company: {
      name: 'Tech Solutions',
      catchPhrase: 'Building technology',
      bs: 'digital solutions',
    },
  }
}

const users: User[] = Array.from(
  { length: 11 },
  (_, index) => createUser(index + 1),
)

describe('pagination utilities', () => {

  // Test 1: Check users on the first page
  test('returns the first five users', () => {
    const result = paginateUsers(users, 1)

    expect(result.map((user) => user.id)).toEqual([1, 2, 3, 4, 5])
  })

  // Test 2: Check users on the second page
  test('returns the next five users', () => {
    const result = paginateUsers(users, 2)

    expect(result.map((user) => user.id)).toEqual([6, 7, 8, 9, 10])
  })

  // Test 3: Check the last page
  test('returns the remaining users on the last page', () => {
    const result = paginateUsers(users, 3)

    expect(result.map((user) => user.id)).toEqual([11])
  })

  // Test 4: Calculate total pages
  test('calculates the correct total number of pages', () => {
    expect(getTotalPages(11)).toBe(3)
    expect(getTotalPages(10)).toBe(2)
  })

  // Test 5: Check empty user list
  test('returns one page when there are no users', () => {
    expect(getTotalPages(0)).toBe(1)
  })

  // Test 6: Check users per page
  test('uses five users per page', () => {
    expect(USERS_PER_PAGE).toBe(5)
  })

})
