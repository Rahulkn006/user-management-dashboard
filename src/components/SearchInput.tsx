
interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div>
      <label
        htmlFor="search"
        className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#65766A] dark:text-[#A4B4AA]"
      >
        Search people
      </label>

      <input
        id="search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Name, username or email..."
        className="h-11 w-full rounded-xl border border-[#DDE5DA] bg-[#F7F9F5] px-4 text-sm text-[#243B30] outline-none transition placeholder:text-[#96A298] focus:border-[#668A72] focus:bg-white focus:ring-4 focus:ring-[#668A72]/10 dark:border-[#3A5144] dark:bg-[#1B2A23] dark:text-[#E8EEE9] dark:placeholder:text-[#84968B] dark:focus:border-[#86AA91] dark:focus:bg-[#1B2A23] dark:focus:ring-[#86AA91]/15"
      />
    </div>
  )
}

export default SearchInput
