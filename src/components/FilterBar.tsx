
interface FilterBarProps {
  cities: string[]
  companies: string[]
  selectedCity: string
  selectedCompany: string
  onCityChange: (value: string) => void
  onCompanyChange: (value: string) => void
}

function FilterBar({
  cities,
  companies,
  selectedCity,
  selectedCompany,
  onCityChange,
  onCompanyChange,
}: FilterBarProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

      <div>
        <label htmlFor="city" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#65766A] dark:text-[#A4B4AA]">
          City
        </label>

        <select
          id="city"
          value={selectedCity}
          onChange={(event) => onCityChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-[#DDE5DA] bg-[#F7F9F5] px-3 text-sm text-[#344B3D] outline-none focus:border-[#668A72] focus:ring-4 focus:ring-[#668A72]/10 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#E8EEE9] dark:focus:border-[#86AA91] dark:focus:ring-[#86AA91]/15"
        >
          <option value="">All cities</option>

          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="company" className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#65766A] dark:text-[#A4B4AA]">
          Company
        </label>

        <select
          id="company"
          value={selectedCompany}
          onChange={(event) => onCompanyChange(event.target.value)}
          className="h-11 w-full rounded-xl border border-[#DDE5DA] bg-[#F7F9F5] px-3 text-sm text-[#344B3D] outline-none focus:border-[#668A72] focus:ring-4 focus:ring-[#668A72]/10 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#E8EEE9] dark:focus:border-[#86AA91] dark:focus:ring-[#86AA91]/15"
        >
          <option value="">All companies</option>

          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

    </div>
  )
}

export default FilterBar
