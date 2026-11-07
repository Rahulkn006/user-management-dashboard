
import type { SortField, SortDirection } from '../types/sorting'

interface SortSelectProps {
  field: SortField
  direction: SortDirection
  onFieldChange: (value: SortField) => void
  onDirectionChange: (value: SortDirection) => void
}

function SortSelect({
  field,
  direction,
  onFieldChange,
  onDirectionChange,
}: SortSelectProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

      <div>
        <label htmlFor="sort-field" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#65766A] dark:text-[#A4B4AA]">
          Sort by
        </label>

        <select
          id="sort-field"
          value={field}
          onChange={(event) => onFieldChange(event.target.value as SortField)}
          className="h-11 w-full rounded-xl border border-[#DDE5DA] bg-[#F7F9F5] px-3 text-sm text-[#344B3D] outline-none focus:border-[#668A72] focus:ring-4 focus:ring-[#668A72]/10 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#E8EEE9] dark:focus:border-[#86AA91] dark:focus:ring-[#86AA91]/15"
        >
          <option value="name">Name</option>
          <option value="username">Username</option>
          <option value="email">Email</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort-direction" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#65766A] dark:text-[#A4B4AA]">
          Order
        </label>

        <select
          id="sort-direction"
          value={direction}
          onChange={(event) => onDirectionChange(event.target.value as SortDirection)}
          className="h-11 w-full rounded-xl border border-[#DDE5DA] bg-[#F7F9F5] px-3 text-sm text-[#344B3D] outline-none focus:border-[#668A72] focus:ring-4 focus:ring-[#668A72]/10 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#E8EEE9] dark:focus:border-[#86AA91] dark:focus:ring-[#86AA91]/15"
        >
          <option value="asc">Ascending (A–Z)</option>
          <option value="desc">Descending (Z–A)</option>
        </select>
      </div>

    </div>
  )
}

export default SortSelect
