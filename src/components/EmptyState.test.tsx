
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import EmptyState from './EmptyState'

describe('EmptyState', () => {

  test('displays the no users found message', () => {
    render(<EmptyState />)

    expect(
      screen.getByRole('region', { name: /no matching users/i })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: /no users found/i })
    ).toBeInTheDocument()

    expect(
      screen.getByText(/we couldn't find any users matching your search or filters/i)
    ).toBeInTheDocument()
  })

})
