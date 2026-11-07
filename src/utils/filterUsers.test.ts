
import { filterUsers } from './filterUsers'
import type { User } from '../types/user'

// Sample users for testing
const users: User[] = [
  {
    id: 1,
    name: 'Rahul Kumar',
    username: 'rahul_dev',
    email: 'rahul@example.com',
    phone: '123456789',
    website: 'rahul.com',
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
  },
  {
    id: 2,
    name: 'Ananya Sharma',
    username: 'ananya_s',
    email: 'ananya@example.com',
    phone: '987654321',
    website: 'ananya.com',
    address: {
      street: 'Park Road',
      suite: 'Apt 2',
      city: 'Chennai',
      zipcode: '600001',
      geo: { lat: '13.08', lng: '80.27' },
    },
    company: {
      name: 'Creative Labs',
      catchPhrase: 'Creative ideas',
      bs: 'design solutions',
    },
  },
]

describe('filterUsers', () => {

  // Test 1: Search by name
  test('filters users by name', () => {
    const result = filterUsers(users, 'Rahul', '', '')

    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Rahul Kumar')
  })

  // Test 2: Search by username
  test('filters users by username', () => {
    const result = filterUsers(users, 'rahul_dev', '', '')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  // Test 3: Search by email
  test('filters users by email', () => {
    const result = filterUsers(users, 'ananya@example.com', '', '')

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(2)
  })

  // Test 4: Filter by city
  test('filters users by city', () => {
    const result = filterUsers(users, '', 'Bangalore', '')

    expect(result).toHaveLength(1)
    expect(result[0].address.city).toBe('Bangalore')
  })

  // Test 5: Filter by company
  test('filters users by company', () => {
    const result = filterUsers(users, '', '', 'Creative Labs')

    expect(result).toHaveLength(1)
    expect(result[0].company.name).toBe('Creative Labs')
  })

  // Test 6: Combine search and filters
  test('applies search, city and company filters together', () => {
    const result = filterUsers(
      users,
      'Rahul',
      'Bangalore',
      'Tech Solutions',
    )

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1)
  })

  // Test 7: Return all users when no filters are applied
  test('returns all users when search and filters are empty', () => {
    const result = filterUsers(users, '', '', '')

    expect(result).toHaveLength(2)
  })

})
