
import { sortUsers } from './sortUsers'
import type { User } from '../types/user'

// Create sample users for testing
function createUser(
  id: number,
  name: string,
  username: string,
  email: string,
): User {
  return {
    id,
    name,
    username,
    email,
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

const users: User[] = [
  createUser(1, 'Zara', 'zara_dev', 'zara@example.com'),
  createUser(2, 'Rahul', 'rahul_dev', 'rahul@example.com'),
  createUser(3, 'Ananya', 'ananya_dev', 'ananya@example.com'),
]

describe('sortUsers', () => {

  // Test 1: Sort names in ascending order
  test('sorts names in ascending order', () => {
    const result = sortUsers(users, 'name', 'asc')

    expect(result.map((user) => user.name)).toEqual([
      'Ananya',
      'Rahul',
      'Zara',
    ])
  })

  // Test 2: Sort names in descending order
  test('sorts names in descending order', () => {
    const result = sortUsers(users, 'name', 'desc')

    expect(result.map((user) => user.name)).toEqual([
      'Zara',
      'Rahul',
      'Ananya',
    ])
  })

  // Test 3: Sort by username
  test('sorts users by username', () => {
    const result = sortUsers(users, 'username', 'asc')

    expect(result.map((user) => user.username)).toEqual([
      'ananya_dev',
      'rahul_dev',
      'zara_dev',
    ])
  })

  // Test 4: Sort by email
  test('sorts users by email', () => {
    const result = sortUsers(users, 'email', 'asc')

    expect(result.map((user) => user.email)).toEqual([
      'ananya@example.com',
      'rahul@example.com',
      'zara@example.com',
    ])
  })

  // Test 5: Check original array is unchanged
  test('does not change the original users array', () => {
    const result = sortUsers(users, 'name', 'asc')

    expect(users.map((user) => user.name)).toEqual([
      'Zara',
      'Rahul',
      'Ananya',
    ])

    expect(result).not.toBe(users)
  })

})
