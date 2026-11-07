
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import UserDetailPage from './UserDetailPage'
import { fetchUserById } from '../api/usersApi'
import type { User } from '../types/user'

// Mock the API function
jest.mock('../api/usersApi', () => ({
  fetchUserById: jest.fn(),
}))

const mockFetchUserById = fetchUserById as jest.MockedFunction<
  typeof fetchUserById
>

// Sample user for testing
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
    geo: {
      lat: '12.97',
      lng: '77.59',
    },
  },
  company: {
    name: 'Tech Solutions',
    catchPhrase: 'Building technology',
    bs: 'digital solutions',
  },
}

describe('UserDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  // Test 1: Display loading state
  test('displays loading while fetching user details', () => {
    mockFetchUserById.mockReturnValue(
      new Promise<User>(() => {}),
    )

    render(<UserDetailPage />)

    expect(screen.getByText(/loading profile/i)).toBeInTheDocument()
  })

  // Test 2: Display user details
  test('displays user details after successful API response', async () => {
    mockFetchUserById.mockResolvedValue(mockUser)

    render(<UserDetailPage />)

    expect(
      await screen.findByRole('heading', { name: 'Rahul Kumar' }),
    ).toBeInTheDocument()

    expect(screen.getByText('Basic Information')).toBeInTheDocument()
    expect(screen.getByText('Address Information')).toBeInTheDocument()
    expect(screen.getByText('Company Information')).toBeInTheDocument()
  })

  // Test 3: Display address and company information
  test('displays address and company details', async () => {
    mockFetchUserById.mockResolvedValue(mockUser)

    render(<UserDetailPage />)

    expect(
      await screen.findByText('Main Street'),
    ).toBeInTheDocument()

    expect(screen.getByText('Bangalore')).toBeInTheDocument()
    expect(screen.getByText('560001')).toBeInTheDocument()
    expect(screen.getByText('Tech Solutions')).toBeInTheDocument()
    expect(screen.getByText('Building technology')).toBeInTheDocument()
  })

  // Test 4: Handle API failure
  test('displays an error when user details cannot be fetched', async () => {
    mockFetchUserById.mockRejectedValue(
      new Error('Network error'),
    )

    render(<UserDetailPage />)

    expect(
  await screen.findByRole('heading', {
    name: /user not found/i,
  }),
).toBeInTheDocument()

expect(
  screen.getByText('Unable to load user details.'),
).toBeInTheDocument()
  })
})
