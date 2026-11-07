
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Pagination from './Pagination'

describe('Pagination', () => {

  // Test 1: Display the current page
  test('displays the current page and total pages', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    )

    expect(screen.getByText('2 / 4')).toBeInTheDocument()
  })

  // Test 2: Next button
  test('calls onNext when Next is clicked', async () => {
    const user = userEvent.setup()
    const onNext = jest.fn()

    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        onPrevious={() => {}}
        onNext={onNext}
      />
    )

    await user.click(screen.getByRole('button', { name: /next/i }))

    expect(onNext).toHaveBeenCalledTimes(1)
  })

  // Test 3: Previous button
  test('calls onPrevious when Previous is clicked', async () => {
    const user = userEvent.setup()
    const onPrevious = jest.fn()

    render(
      <Pagination
        currentPage={2}
        totalPages={4}
        onPrevious={onPrevious}
        onNext={() => {}}
      />
    )

    await user.click(screen.getByRole('button', { name: /previous/i }))

    expect(onPrevious).toHaveBeenCalledTimes(1)
  })

  // Test 4: Previous disabled on first page
  test('disables Previous on the first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={4}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /previous/i })).toBeDisabled()
  })

  // Test 5: Next disabled on last page
  test('disables Next on the last page', () => {
    render(
      <Pagination
        currentPage={4}
        totalPages={4}
        onPrevious={() => {}}
        onNext={() => {}}
      />
    )

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled()
  })

})
