
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import NotFoundPage from './NotFoundPage'

describe('NotFoundPage', () => {

  // Test 1: Display the 404 page
  test('displays the page not found message', () => {
    render(<NotFoundPage />)

    expect(
      screen.getByRole('heading', { name: /page not found/i }),
    ).toBeInTheDocument()

    expect(
      screen.getByText(/page you are looking for doesn't exist/i),
    ).toBeInTheDocument()
  })

  // Test 2: Provide a link back to dashboard
  test('provides a link back to the dashboard', () => {
    render(<NotFoundPage />)

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', '/')
  })

})
