
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import SortSelect from './SortSelect'

describe('SortSelect', () => {

  // Test 1: Check whether both dropdowns are displayed
  test('displays sorting options', () => {
    render(
      <SortSelect
        field="name"
        direction="asc"
        onFieldChange={() => {}}
        onDirectionChange={() => {}}
      />
    )

    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/order/i)).toBeInTheDocument()
  })

  // Test 2: Check sorting field selection
  test('calls onFieldChange when a field is selected', async () => {
    const user = userEvent.setup()
    const onFieldChange = jest.fn()

    render(
      <SortSelect
        field="name"
        direction="asc"
        onFieldChange={onFieldChange}
        onDirectionChange={() => {}}
      />
    )

    const fieldSelect = screen.getByLabelText(/sort by/i)

    await user.selectOptions(fieldSelect, 'email')

    expect(onFieldChange).toHaveBeenCalledWith('email')
  })

  // Test 3: Check sorting direction selection
  test('calls onDirectionChange when direction is selected', async () => {
    const user = userEvent.setup()
    const onDirectionChange = jest.fn()

    render(
      <SortSelect
        field="name"
        direction="asc"
        onFieldChange={() => {}}
        onDirectionChange={onDirectionChange}
      />
    )

    const directionSelect = screen.getByLabelText(/order/i)

    await user.selectOptions(directionSelect, 'desc')

    expect(onDirectionChange).toHaveBeenCalledWith('desc')
  })

})
