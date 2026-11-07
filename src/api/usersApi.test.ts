
import { fetchUsers, fetchUserById } from './usersApi'
import type { User } from '../types/user'

const mockUser: User = {
  id: 1,
  name: 'Rahul Kumar',
  username: 'rahul',
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
}

describe('Users API', () => {

  // Test 1: Successfully fetch all users
  test('fetches users successfully', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([mockUser]),
    })

    const result = await fetchUsers()

    expect(result).toEqual([mockUser])
    expect(globalThis.fetch).toHaveBeenCalledTimes(1)
  })

  // Test 2: Handle users API failure
  test('handles users API failure', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
    })

    await expect(fetchUsers()).rejects.toThrow(
      'Failed to fetch users',
    )
  })

  // Test 3: Successfully fetch one user
  test('fetches a user by ID successfully', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockUser),
    })

    const result = await fetchUserById(1)

    expect(result).toEqual(mockUser)
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/users/1',
    )
  })

  // Test 4: Handle individual user API failure
  test('handles user API failure', async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
    })

    await expect(fetchUserById(1)).rejects.toThrow(
      'Failed to fetch user',
    )
  })

})
