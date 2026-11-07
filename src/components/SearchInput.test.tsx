
import { render, screen } from '@testing-library/react'
import SearchInput from './SearchInput'
import { useState } from 'react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

describe('SearchInput', () => {
  test('renders the search input', () => {
    render(
      <SearchInput
        value=""
        onChange={() => {}}
      />
    )

    const input = screen.getByRole('searchbox', {
      name: /search people/i,
    })

    expect(input).toBeInTheDocument()
  })
})

// Test 2: Check whether users can type
  test('allows users to type in the search input', async () => {
    const user = userEvent.setup()

    function TestSearchInput() {
      const [value, setValue] = useState('')

      return (
        <SearchInput
          value={value}
          onChange={setValue}
        />
      )
    }

    render(<TestSearchInput />)

    const input = screen.getByRole('searchbox', {
      name: /search people/i,
    })

    await user.type(input, 'Rahul')

    expect(input).toHaveValue('Rahul')
  })

