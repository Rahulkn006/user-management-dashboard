
import { useEffect, useState } from 'react'

function useDebounce(value: string, delay: number = 400) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    // Wait for the specified delay
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    // Cancel the previous timer if the value changes
    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export default useDebounce
