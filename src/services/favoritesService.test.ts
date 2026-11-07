
import {
  getFavoriteUserIds,
  saveFavoriteUserIds,
} from './favoritesService'

describe('favoritesService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  // Test 1: Return an empty array when there are no favorites
  test('returns an empty array when no favorites are saved', () => {
    expect(getFavoriteUserIds()).toEqual([])
  })

  // Test 2: Retrieve saved favorite IDs
  test('retrieves saved favorite user IDs', () => {
    localStorage.setItem(
      'user-dashboard-favorites',
      JSON.stringify([1, 2, 3]),
    )

    expect(getFavoriteUserIds()).toEqual([1, 2, 3])
  })

  // Test 3: Ignore invalid values
  test('returns only numeric favorite IDs', () => {
    localStorage.setItem(
      'user-dashboard-favorites',
      JSON.stringify([1, 'two', 3, null]),
    )

    expect(getFavoriteUserIds()).toEqual([1, 3])
  })

  // Test 4: Handle invalid JSON
  test('returns an empty array when stored data is invalid', () => {
    localStorage.setItem(
      'user-dashboard-favorites',
      'invalid JSON',
    )

    expect(getFavoriteUserIds()).toEqual([])
  })

  // Test 5: Handle data that is not an array
  test('returns an empty array when stored data is not an array', () => {
    localStorage.setItem(
      'user-dashboard-favorites',
      JSON.stringify({ id: 1 }),
    )

    expect(getFavoriteUserIds()).toEqual([])
  })

  // Test 6: Save favorite IDs
  test('saves favorite user IDs to localStorage', () => {
    saveFavoriteUserIds([1, 2, 3])

    expect(
      localStorage.getItem('user-dashboard-favorites'),
    ).toBe('[1,2,3]')
  })
})
