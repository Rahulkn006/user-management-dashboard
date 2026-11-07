
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { fetchUserById } from '../api/usersApi'
import type { User } from '../types/user'

function UserDetailPage() {
  const { id } = useParams()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true)
        setError('')

        const data = await fetchUserById(Number(id))
        setUser(data)
      } catch {
        setError('Unable to load user details.')
      } finally {
        setLoading(false)
      }
    }

    void loadUser()
  }, [id])

  if (loading) {
    return <p className="min-h-screen bg-[#F5F6F0] p-10 text-center text-[#45634E] dark:bg-[#101A15] dark:text-[#A9CDB1]">Loading profile...</p>
  }

  if (error || !user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F6F0] dark:bg-[#101A15]">
        <h2 className="text-2xl font-bold text-[#19382F] dark:text-[#E8EEE9]">User not found</h2>
        <p className="mt-2 text-slate-500 dark:text-[#A4B4AA]">{error}</p>
        <Link to="/" className="mt-5 text-[#315D42] font-semibold dark:text-[#9BC5A8]">← Back to users</Link>
      </div>
    )
  }

  const initials = user.name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase()
  const website = user.website.startsWith('http') ? user.website : `https://${user.website}`

  return (
    <main className="min-h-screen bg-[#F5F6F0] px-4 py-8 text-[#243B30] dark:bg-[#101A15] dark:text-[#E8EEE9] sm:px-6">
      <div className="mx-auto max-w-5xl">

        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#45634E] hover:text-[#19382F] dark:text-[#9BC5A8] dark:hover:text-[#DCE8DF]">
          ← Back to users
        </Link>

        {/* Profile header */}
        <section className="mt-5 flex items-center gap-5 rounded-2xl bg-[#19382F] p-6 text-white shadow-sm sm:p-8 dark:bg-[#17271E] dark:ring-1 dark:ring-[#34493E]">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#DCE9C5] text-xl font-bold text-[#19382F]">
            {initials}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B8C9BE]">
              USER PROFILE · #{user.id}
            </p>
            <h1 className="mt-1 text-2xl font-bold sm:text-3xl">
              {user.name}
            </h1>
            <p className="mt-1 text-sm text-[#C5D4C9]">
              @{user.username}
            </p>
          </div>
        </section>

        {/* Basic information */}
        <section className="mt-5 rounded-2xl border border-[#E1E7DD] bg-white p-5 shadow-sm sm:p-6 dark:border-[#34493E] dark:bg-[#17251D]">
          <h2 className="text-lg font-bold text-[#243B30] dark:text-[#E8EEE9]">Basic Information</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Info label="Email" value={user.email} />
            <Info label="Phone" value={user.phone} />

            <div>
              <Info label="Website" value={user.website} />
              <a href={website} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-sm font-medium text-[#456F52] dark:text-[#9BC5A8] hover:underline">
                Visit website →
              </a>
            </div>
          </div>
        </section>

        {/* Address information */}
        <section className="mt-5 rounded-2xl border border-[#E1E7DD] bg-white p-5 shadow-sm sm:p-6 dark:border-[#34493E] dark:bg-[#17251D]">
          <h2 className="text-lg font-bold text-[#243B30] dark:text-[#E8EEE9]">Address Information</h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Info label="Street" value={user.address.street} />
            <Info label="Suite" value={user.address.suite} />
            <Info label="City" value={user.address.city} />
            <Info label="Zipcode" value={user.address.zipcode} />
            <Info label="Latitude" value={user.address.geo.lat} />
            <Info label="Longitude" value={user.address.geo.lng} />
          </div>
        </section>

        {/* Company information */}
        <section className="mt-5 rounded-2xl border border-[#E1E7DD] bg-white p-5 shadow-sm sm:p-6 dark:border-[#34493E] dark:bg-[#17251D]">
          <h2 className="text-lg font-bold text-[#243B30] dark:text-[#E8EEE9]">Company Information</h2>

          <div className="mt-5 space-y-5">
            <Info label="Company Name" value={user.company.name} />
            <Info label="Catch Phrase" value={user.company.catchPhrase} />
            <Info label="Business Description" value={user.company.bs} />
          </div>
        </section>

        <p className="py-6 text-center text-xs text-[#849087] dark:text-[#A4B4AA]">
          People Directory · User #{user.id}
        </p>

      </div>
    </main>
  )
}

// Reusable information display
function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wider text-[#91A094] dark:text-[#9CAF9F]">
        {label}
      </p>
      <p className="mt-1 break-words text-sm font-medium text-[#354B3C] dark:text-[#DCE8DF]">
        {value}
      </p>
    </div>
  )
}

export default UserDetailPage
