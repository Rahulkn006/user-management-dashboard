
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router'

import UserCard from './UserCard'
import type { User } from '../types/user'

const mockUser: User = {
  id: 1,
  name: 'Rahul Kumar',
  username: 'rahul',
  email: 'rahul@example.com',
  phone: '123-456-7890',
  website: 'rahul.com',
  address: {
    street: 'Main Street',
    suite: 'Apt. 1',
    city: 'Bangalore',
    zipcode: '560001',
    geo: {
      lat: '12.9716',
      lng: '77.5946',
    },
  },
  company: {
    name: 'Tech Solutions',
    catchPhrase: 'Building technology',
    bs: 'digital solutions',
  },
}

describe('UserCard', () => {

  // Test 1: Display user information
  test('displays user details correctly', () => {
    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('Rahul Kumar')).toBeInTheDocument()
    expect(screen.getByText('@rahul')).toBeInTheDocument()
    expect(screen.getByText('rahul@example.com')).toBeInTheDocument()
    expect(screen.getByText('Bangalore')).toBeInTheDocument()
    expect(screen.getByText('Tech Solutions')).toBeInTheDocument()
  })

  // Test 2: Display the profile link
  test('displays the View Profile link', () => {
    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFavorite={false}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    const profileLink = screen.getByRole('link', {
      name: /view profile/i,
    })

    expect(profileLink).toHaveAttribute('href', '/users/1')
  })

  // Test 3: Add user to favorites
  test('calls onToggleFavorite when favorite button is clicked', async () => {
    const user = userEvent.setup()
    const onToggleFavorite = jest.fn()

    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFavorite={false}
          onToggleFavorite={onToggleFavorite}
        />
      </MemoryRouter>
    )

    const favoriteButton = screen.getByRole('button', {
      name: /add rahul kumar to favorites/i,
    })

    await user.click(favoriteButton)

    expect(onToggleFavorite).toHaveBeenCalledTimes(1)
    expect(onToggleFavorite).toHaveBeenCalledWith(1)
  })

  // Test 4: Display favorite status
  test('shows the correct favorite button label', () => {
    render(
      <MemoryRouter>
        <UserCard
          user={mockUser}
          isFavorite={true}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('button', {
        name: /remove rahul kumar from favorites/i,
      })
    ).toBeInTheDocument()
  })

})
