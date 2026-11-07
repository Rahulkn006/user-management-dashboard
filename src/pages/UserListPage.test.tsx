
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import UserListPage from './UserListPage'
import { fetchUsers } from '../api/usersApi'
import type { User } from '../types/user'

// Mock the API function
jest.mock('../api/usersApi', () => ({
  fetchUsers: jest.fn(),
}))

const mockFetchUsers = fetchUsers as jest.MockedFunction<
  typeof fetchUsers
>

// Sample user data
const mockUsers: User[] = [
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
    username: 'ananya',
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

describe('UserListPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  // Test 1: Display loading state
  test('displays loading state while fetching users', () => {
    mockFetchUsers.mockReturnValue(
      new Promise<User[]>(() => {}),
    )

    render(<UserListPage />)

    expect(
      screen.getByRole('region', { name: /loading users/i }),
    ).toBeInTheDocument()
  })

  // Test 2: Display fetched users
  test('displays users after successful API response', async () => {
    mockFetchUsers.mockResolvedValue(mockUsers)

    render(<UserListPage />)

    expect(
      await screen.findByText('Rahul Kumar'),
    ).toBeInTheDocument()

    expect(
      await screen.findByText('Ananya Sharma'),
    ).toBeInTheDocument()
  })

  // Test 3: Search users by name
  test('filters users when searching by name', async () => {
    const user = userEvent.setup()

    mockFetchUsers.mockResolvedValue(mockUsers)

    render(<UserListPage />)

    await screen.findByText('Rahul Kumar')

    const searchInput = screen.getByRole('searchbox', {
      name: /search people/i,
    })

    await user.type(searchInput, 'Rahul')

    await waitFor(() => {
      expect(screen.getByText('Rahul Kumar')).toBeInTheDocument()
      expect(screen.queryByText('Ananya Sharma')).not.toBeInTheDocument()
    })
  })

  // Test 4: Filter users by city
  test('filters users by selected city', async () => {
    const user = userEvent.setup()

    mockFetchUsers.mockResolvedValue(mockUsers)

    render(<UserListPage />)

    await screen.findByText('Rahul Kumar')

    const cityFilter = screen.getByLabelText('City')

    await user.selectOptions(cityFilter, 'Chennai')

    await waitFor(() => {
      expect(screen.getByText('Ananya Sharma')).toBeInTheDocument()
      expect(screen.queryByText('Rahul Kumar')).not.toBeInTheDocument()
    })
  })

  // Test 5: Handle API failure
  test('displays an error message when API request fails', async () => {
    mockFetchUsers.mockRejectedValue(new Error('Network error'))

    render(<UserListPage />)

    const errorMessage = await screen.findByRole('alert')

    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent(/unable to load users/i)
  })
})
