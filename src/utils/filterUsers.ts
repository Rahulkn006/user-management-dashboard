
import type { User } from '../types/user'

export function filterUsers(
  users: User[],
  searchText: string,
  selectedCity: string,
  selectedCompany: string,
): User[] {

  // Convert search text to lowercase
  const search = searchText.trim().toLowerCase()

  // Convert selected filters to lowercase
  const city = selectedCity.toLowerCase()
  const company = selectedCompany.toLowerCase()

  // Check each user
  return users.filter((user) => {

    // Search by name, username or email
    const matchesSearch =
      search === '' ||
      user.name.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)

    // Check city
    const matchesCity =
      city === '' ||
      user.address.city.toLowerCase() === city

    // Check company
    const matchesCompany =
      company === '' ||
      user.company.name.toLowerCase() === company

    // User must match all three conditions
    return matchesSearch && matchesCity && matchesCompany
  })
}
