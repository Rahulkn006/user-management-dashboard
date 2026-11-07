
import { useState, useEffect } from 'react'

// Components
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchInput from '../components/SearchInput'
import FilterBar from '../components/FilterBar'
import SortSelect from '../components/SortSelect'
import UserGrid from '../components/UserGrid'
import Pagination from '../components/Pagination'
import LoadingState from '../components/LoadingState'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'

// API and types
import { fetchUsers } from '../api/usersApi'
import type { User } from '../types/user'
import type { SortField, SortDirection } from '../types/sorting'

// Custom hook and utilities
import useDebounce from '../hooks/useDebounce'
import { filterUsers } from '../utils/filterUsers'
import { sortUsers } from '../utils/sortUsers'
import { paginateUsers, getTotalPages } from '../utils/pagination'

// Favorites
import {
  getFavoriteUserIds,
  saveFavoriteUserIds,
} from '../services/favoritesService'

function UserListPage() {
  const [users, setUsers] = useState<User[]>([])

  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [company, setCompany] = useState('')

  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const [currentPage, setCurrentPage] = useState(1)

  const [favoriteIds, setFavoriteIds] = useState<number[]>(
    () => getFavoriteUserIds(),
  )

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Wait 400ms before applying search
  const debouncedSearch = useDebounce(search, 400)

  // Fetch users when the page loads
  useEffect(() => {
    fetchUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch(() => {
        setError('Unable to load users. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Save favorites in localStorage
  useEffect(() => {
    saveFavoriteUserIds(favoriteIds)
  }, [favoriteIds])

  // Retry API request
  function handleRetry() {
    setLoading(true)
    setError('')

    fetchUsers()
      .then((data) => {
        setUsers(data)
      })
      .catch(() => {
        setError('Unable to load users. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // Get unique cities and companies
  const cities = Array.from(
    new Set(users.map((user) => user.address.city)),
  ).sort()

  const companies = Array.from(
    new Set(users.map((user) => user.company.name)),
  ).sort()

  // Search and filter users
  const filteredUsers = filterUsers(
    users,
    debouncedSearch,
    city,
    company,
  )

  // Sort users
  const sortedUsers = sortUsers(
    filteredUsers,
    sortField,
    sortDirection,
  )

  // Pagination
  const totalPages = getTotalPages(sortedUsers.length)
  const displayedPage = Math.min(currentPage, totalPages)

  const paginatedUsers = paginateUsers(
    sortedUsers,
    displayedPage,
  )

  // Add or remove favorites
  function handleToggleFavorite(userId: number) {
    setFavoriteIds((previous) =>
      previous.includes(userId)
        ? previous.filter((id) => id !== userId)
        : [...previous, userId],
    )
  }

  // Search and filter handlers
  function handleSearchChange(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleCityChange(value: string) {
    setCity(value)
    setCurrentPage(1)
  }

  function handleCompanyChange(value: string) {
    setCompany(value)
    setCurrentPage(1)
  }

  // Sorting handlers
  function handleSortFieldChange(value: SortField) {
    setSortField(value)
    setCurrentPage(1)
  }

  function handleSortDirectionChange(value: SortDirection) {
    setSortDirection(value)
    setCurrentPage(1)
  }

  // Loading screen
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F5F6F0] text-[#243B30] dark:bg-[#101A15] dark:text-[#E8EEE9]">
        <Header favoriteCount={favoriteIds.length} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <LoadingState />
        </main>
        <Footer />
      </div>
    )
  }

  // Error screen
  if (error) {
    return (
      <div className="flex min-h-screen flex-col bg-[#F5F6F0] text-[#243B30] dark:bg-[#101A15] dark:text-[#E8EEE9]">
        <Header favoriteCount={favoriteIds.length} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <ErrorState message={error} onRetry={handleRetry} />
        </main>
        <Footer />
      </div>
    )
  }

  // Main dashboard
  return (
    <div className="flex min-h-screen flex-col bg-[#F5F6F0] text-[#243B30] transition-colors dark:bg-[#101A15] dark:text-[#E8EEE9]">
      <Header favoriteCount={favoriteIds.length} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">

        {/* Page heading */}
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#718577] dark:text-[#9CAF9F]">
              DIRECTORY OVERVIEW
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#1B3027] dark:text-[#E8EEE9]">
              All users
            </h2>

            <p className="mt-1 text-sm text-[#738078] dark:text-[#A4B4AA]">
              Search and organize the people in your directory.
            </p>
          </div>

          <div className="w-fit rounded-xl border border-[#DCE5D8] bg-[#EAF0E5] px-4 py-2 dark:border-[#3A5144] dark:bg-[#1B2A23]">
            <p className="text-sm font-semibold text-[#365442] dark:text-[#DCE8DF]">
              {users.length} total records
            </p>
          </div>
        </div>

        {/* Search, filters and sorting */}
        <section className="mb-6 rounded-2xl border border-[#E1E7DD] bg-white p-4 shadow-sm sm:p-5 dark:border-[#34493E] dark:bg-[#17251D]">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:items-end">

            <div className="lg:col-span-2">
              <SearchInput
                value={search}
                onChange={handleSearchChange}
              />
            </div>

            <div className="lg:col-span-2">
              <FilterBar
                cities={cities}
                companies={companies}
                selectedCity={city}
                selectedCompany={company}
                onCityChange={handleCityChange}
                onCompanyChange={handleCompanyChange}
              />
            </div>

            <div className="lg:col-span-2">
              <SortSelect
                field={sortField}
                direction={sortDirection}
                onFieldChange={handleSortFieldChange}
                onDirectionChange={handleSortDirectionChange}
              />
            </div>

          </div>
        </section>

        {/* Results heading */}
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#243B30] dark:text-[#E8EEE9]">
              People
            </h3>

            <p className="mt-1 text-sm text-[#849087] dark:text-[#A4B4AA]">
              Showing {paginatedUsers.length} of {sortedUsers.length} matching users
            </p>
          </div>

          <span className="rounded-full bg-[#E9EFE4] px-3 py-1.5 text-xs font-semibold text-[#45634E] dark:bg-[#2C4536] dark:text-[#DCE8DF]">
            Page {displayedPage} of {totalPages}
          </span>
        </div>

        {/* User cards or empty state */}
        {sortedUsers.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <UserGrid
              users={paginatedUsers}
              favoriteIds={favoriteIds}
              onToggleFavorite={handleToggleFavorite}
            />

            <div className="mt-7">
              <Pagination
                currentPage={displayedPage}
                totalPages={totalPages}
                onPrevious={() =>
                  setCurrentPage(Math.max(1, displayedPage - 1))
                }
                onNext={() =>
                  setCurrentPage(Math.min(totalPages, displayedPage + 1))
                }
              />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default UserListPage
