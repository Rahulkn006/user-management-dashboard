
const FAVORITES_KEY = 'user-dashboard-favorites'

// Get saved favorite IDs
export function getFavoriteUserIds(): number[] {
  try {
    const storedData = localStorage.getItem(FAVORITES_KEY)

    if (!storedData) {
      return []
    }

    const data: unknown = JSON.parse(storedData)

    if (!Array.isArray(data)) {
      return []
    }

    return data.filter(
      (id): id is number => typeof id === 'number',
    )
  } catch {
    return []
  }
}

// Save favorite IDs
export function saveFavoriteUserIds(ids: number[]): void {
  localStorage.setItem(
    FAVORITES_KEY,
    JSON.stringify(ids),
  )
}
