# User Management Dashboard — Testing Report

**Project:** User Management Dashboard  
**Testing status:** Completed for the recorded test cases  
**Test runner:** Jest 29.7.0  
**Component testing:** React Testing Library  
**Language:** TypeScript  
**Test environment:** jsdom

---

## 1. Testing Overview

Testing was carried out to check that the dashboard's React components, utility functions, API functions and main pages behave as expected.

The tests cover component rendering, user interactions, search and filtering, sorting, pagination, favorites storage, API success and failure handling, and page loading and error states. Sample data and mocked API responses are used so tests do not depend on a live API connection.

## 2. Testing Tools and Environment

| Tool | Purpose |
|---|---|
| Jest | Runs automated tests and reports pass or fail. |
| React Testing Library | Renders React components and checks how users interact with them. |
| Jest DOM | Adds readable DOM checks such as `toBeInTheDocument()` and `toBeDisabled()`. |
| User Event | Simulates typing, clicking and selecting dropdown options. |
| ts-jest | Transforms TypeScript test files for Jest. |
| jsdom | Provides a simulated browser environment for component tests. |
| TypeScript | Provides types for application and test data. |

### Test configuration files

- `jest.config.cjs` — configures Jest, the jsdom environment, TypeScript transformation, test-file matching and coverage collection.
- `src/setupTests.ts` — imports `@testing-library/jest-dom` to enable its DOM matchers.
- `src/test-mocks/react-router.tsx` — provides the router components/hooks needed by component tests without starting the application's real router.
- `package.json` — contains the test and coverage commands.

### Commands used

```bash
npm test -- --runInBand
npm run test:coverage -- --runInBand
```

`--runInBand` runs the Jest test suites in a single process. The coverage command runs the tests and produces coverage results and an HTML report.

---

## 3. Component Testing

### 3.1 SearchInput

**Test file:** `src/components/SearchInput.test.tsx`  
**Purpose:** Check that the search input is displayed and accepts typed text.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC001 | Renders the search input | Renders `SearchInput` and checks that the search field is present. | PASS |
| TC002 | Allows users to type | Simulates typing `Rahul` and checks that the input value becomes `Rahul`. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `render(<SearchInput ... />)` | Displays the component in the test environment. |
| `screen.getByRole('searchbox', ...)` | Finds the search field by its accessible role and label. |
| `expect(...).toBeInTheDocument()` | Checks that the search field appears on the page. |
| `userEvent.setup()` | Creates a simulated user for interactions. |
| `user.type(input, 'Rahul')` | Simulates typing text into the input. |
| `useState()` in the test wrapper | Holds the controlled input value and updates it through `onChange`. |
| `toHaveValue('Rahul')` | Checks the text currently inside the input. |

**What this confirms:** The component renders and its controlled input responds to typing.

### 3.2 Pagination Component

**Test file:** `src/components/Pagination.test.tsx`  
**Purpose:** Check the page indicator and the Previous/Next button behaviour.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC003 | Displays current and total pages | Checks that the supplied page information is displayed. | PASS |
| TC004 | Calls `onNext` when Next is clicked | Checks that clicking Next calls the supplied callback once. | PASS |
| TC005 | Calls `onPrevious` when Previous is clicked | Checks that clicking Previous calls the supplied callback once. | PASS |
| TC006 | Disables Previous on the first page | Checks that Previous is disabled when the current page is 1. | PASS |
| TC007 | Disables Next on the last page | Checks that Next is disabled on the final page. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `jest.fn()` | Creates a mock function that Jest can monitor. It is used for the button callbacks. |
| `user.click(button)` | Simulates clicking a button. |
| `toHaveBeenCalledTimes(1)` | Checks that a callback was called exactly once. |
| `toBeDisabled()` | Checks that a button is disabled. |
| `getByRole('button', ...)` | Finds a button by its accessible role and name. |

**What this confirms:** The component displays the correct page state and calls the correct callback when a usable button is clicked.

### 3.3 UserCard

**Test file:** `src/components/UserCard.test.tsx`  
**Purpose:** Check user information, profile navigation and favorite-button behaviour.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC008 | Displays user details | Checks the user's name, username, email, city and company. | PASS |
| TC009 | Displays the profile link | Checks that the profile link points to `/users/1` for the sample user. | PASS |
| TC010 | Calls the favorite handler | Clicks the favorite button and checks that the callback receives the user's ID. | PASS |
| TC011 | Displays the favorite status | Checks the accessible label when the user is already a favorite. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `const mockUser: User = {...}` | Creates sample user data and checks it against the application's `User` type. |
| `MemoryRouter` | Supplies the router context required by the profile link during the test. |
| `getByText()` | Finds visible user details such as the name and email. |
| `getByRole('link', ...)` | Finds the profile link. |
| `toHaveAttribute('href', '/users/1')` | Checks the destination stored in the link's `href` attribute. |
| `jest.fn()` | Creates a mock favorite callback. |
| `user.click()` | Simulates clicking the favorite button. |
| `toHaveBeenCalledWith(1)` | Checks that the callback received user ID `1`. |

**What this confirms:** The card displays its sample data, links to the expected profile route and calls the favorite handler with the correct user ID.

### 3.4 EmptyState

**Test file:** `src/components/EmptyState.test.tsx`  
**Purpose:** Check the message displayed when no users match the search or filters.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC043 | Displays the no-users-found message | Checks the empty-state section, heading and explanatory message. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in this test |
|---|---|
| `render(<EmptyState />)` | Displays the empty-state component. |
| `getByRole()` | Finds the section or heading by its accessible role. |
| `getByText()` | Finds the explanatory message by its displayed text. |
| `toBeInTheDocument()` | Checks that the expected content is present. |

**What this confirms:** The user receives a clear message when the result list is empty.

### 3.5 SortSelect

**Test file:** `src/components/SortSelect.test.tsx`  
**Purpose:** Check that the sorting dropdowns appear and report the selected options.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC046 | Displays sorting options | Checks that the sort-field and sort-order dropdowns are displayed. | PASS |
| TC047 | Changes the sort field | Selects Email and checks that `onFieldChange` receives `email`. | PASS |
| TC048 | Changes the sort direction | Selects Descending and checks that `onDirectionChange` receives `desc`. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `getByLabelText()` | Finds a dropdown using its associated label. |
| `user.selectOptions()` | Simulates selecting an option from a dropdown. |
| `jest.fn()` | Creates a mock callback to monitor the selection. |
| `toHaveBeenCalledWith()` | Checks the value passed to the callback. |

**What this confirms:** Both sorting controls are available and report the selected field and direction to their parent component.

---

## 4. Utility Function Testing

Utility tests check data-processing functions directly, without rendering React components. Sample data is passed into each function and the returned result is checked.

### 4.1 filterUsers

**Test file:** `src/utils/filterUsers.test.ts`  
**Purpose:** Check searching by name, username and email; filtering by city and company; and combining filter conditions.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC012 | Filters by name | Returns the user whose name matches the search text. | PASS |
| TC013 | Filters by username | Returns the user whose username matches the search text. | PASS |
| TC014 | Filters by email | Returns the user whose email matches the search text. | PASS |
| TC015 | Filters by city | Returns users matching the selected city. | PASS |
| TC016 | Filters by company | Returns users matching the selected company. | PASS |
| TC017 | Combines search and filters | Applies search text, city and company conditions together. | PASS |
| TC018 | Handles empty search and filters | Returns all sample users when no search or filter is selected. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `const users: User[] = [...]` | Creates sample user records using the application's `User` type. |
| `filterUsers(users, search, city, company)` | Calls the filtering function with the selected conditions. |
| `toHaveLength(1)` | Checks that exactly one matching user is returned. |
| `result[0]` | Accesses the first item in the returned array. |
| `toBe()` | Checks an exact value, such as a user's ID or city. |
| `toHaveLength(2)` | Checks that both sample users are returned when no filters are applied. |

**What this confirms:** Search and filter conditions return the expected users, including when multiple conditions are applied together.

### 4.2 sortUsers

**Test file:** `src/utils/sortUsers.test.ts`  
**Purpose:** Check sorting by name, username and email, in ascending or descending order where tested, and verify that the original array is preserved.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC019 | Sorts names ascending | Checks that names are returned in A-to-Z order. | PASS |
| TC020 | Sorts names descending | Checks that names are returned in Z-to-A order. | PASS |
| TC021 | Sorts by username | Checks ascending username order. | PASS |
| TC022 | Sorts by email | Checks ascending email order. | PASS |
| TC023 | Preserves the original array | Checks that sorting returns a separate array and does not reorder the original sample array. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `createUser()` | Creates sample users for the sorting tests. |
| `sortUsers(users, field, direction)` | Calls the sorting utility with a field and direction. |
| `map((user) => user.name)` | Extracts names from the sorted users so their order can be checked. |
| `toEqual([...])` | Compares array contents and their order with the expected array. |
| `not.toBe(users)` | Checks that the returned array is not the same array object as the original. |

**What this confirms:** Sorting returns the expected order and does not mutate the original user array.

### 4.3 Pagination Utilities

**Test file:** `src/utils/pagination.test.ts`  
**Purpose:** Check which users belong on each page, total-page calculation, empty-list handling and page size.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC024 | Returns the first five users | Checks that page 1 contains user IDs 1–5. | PASS |
| TC025 | Returns the next five users | Checks that page 2 contains user IDs 6–10. | PASS |
| TC026 | Returns the remaining users on the last page | Checks that page 3 contains the remaining user when there are 11 users. | PASS |
| TC027 | Calculates total pages | Checks the page count for 11 users and 10 users. | PASS |
| TC028 | Handles an empty user list | Checks that the utility returns at least one page when there are no users. | PASS |
| TC029 | Uses five users per page | Checks that `USERS_PER_PAGE` is 5. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `createUser(id)` | Creates a sample user with the supplied ID. |
| `Array.from({ length: 11 }, ...)` | Creates an array containing 11 sample users. |
| `paginateUsers(users, pageNumber)` | Returns the users belonging to the requested page. |
| `getTotalPages(totalUsers)` | Calculates the number of pages needed for the supplied user count. |
| `USERS_PER_PAGE` | Stores the configured number of users per page. |
| `map((user) => user.id)` | Extracts user IDs so the contents of a page can be checked. |
| `toEqual([...])` | Checks that the returned IDs match the expected IDs in order. |

**What this confirms:** The pagination calculations select the correct users and handle full, partial and empty pages.

---

## 5. API Testing

**Test file:** `src/api/usersApi.test.ts`  
**Purpose:** Check successful and unsuccessful requests for the full user list and for an individual user.

The tests mock `fetch()` so they can control the API response. They do not depend on a live network request.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC030 | Fetches all users successfully | Supplies a successful mocked response and checks the returned user list. | PASS |
| TC031 | Handles user-list API failure | Supplies a non-successful response and checks that the function rejects with the expected error. | PASS |
| TC032 | Fetches one user by ID | Supplies a successful user response and checks the returned data and requested URL. | PASS |
| TC033 | Handles individual-user API failure | Supplies a non-successful response and checks that the function rejects with the expected error. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `globalThis.fetch = jest.fn()` | Replaces `fetch` with a mock function that Jest can control. |
| `mockResolvedValue()` | Makes a mocked asynchronous call return sample data successfully. |
| `async` / `await` | Waits for an asynchronous API function to finish before checking its result. |
| `toEqual()` | Checks that the returned data matches the sample data. |
| `toHaveBeenCalledWith()` | Checks that `fetch` was called with the expected API URL. |
| `rejects.toThrow()` | Checks that the API function rejects with the expected error message. |

**What this confirms:** The API functions handle successful responses and HTTP failure responses for both list and individual-user requests.

---

## 6. Page Testing

### 6.1 UserListPage

**Test file:** `src/pages/UserListPage.test.tsx`  
**Purpose:** Check the main dashboard's loading state, user display, search, city filter and API error state.

The API function is mocked and sample users are supplied to the page. This keeps the tests independent of the live API.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC034 | Displays loading state | Keeps the loading UI visible while the mocked request is pending. | PASS |
| TC035 | Displays users after a successful response | Checks that the sample user names appear after loading. | PASS |
| TC036 | Searches by name | Types a name and checks that matching users remain while non-matching users are removed. | PASS |
| TC037 | Filters by city | Selects a city and checks that only users from that city remain. | PASS |
| TC038 | Displays an API error | Rejects the mocked request and checks that the page displays its error message. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `jest.mock('../api/usersApi', ...)` | Replaces the real API module with a mock for this test file. |
| `mockResolvedValue(mockUsers)` | Makes the mocked API return the sample users successfully. |
| `mockRejectedValue()` | Simulates a failed API request. |
| `beforeEach()` | Runs setup code before each test. |
| `jest.clearAllMocks()` | Clears previous mock call information between tests. |
| `localStorage.clear()` | Clears saved browser storage before a test. |
| `findByText()` | Finds text after it appears, useful when the page loads asynchronously. |
| `user.type()` | Simulates typing into the dashboard search field. |
| `user.selectOptions()` | Simulates choosing a city from the filter dropdown. |
| `waitFor()` | Waits until the expected search or filter result appears. |
| `queryByText()` | Checks whether text is absent, such as a user who should be filtered out. |

**What this confirms:** The main page handles loading, successful data display, search, city filtering and API failure.

### 6.2 UserDetailPage

**Test file:** `src/pages/UserDetailPage.test.tsx`  
**Purpose:** Check loading, user information, address/company information and API failure handling on an individual profile page.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC039 | Displays loading state | Keeps the loading message visible while the mocked user request is pending. | PASS |
| TC040 | Displays user details | Checks that the sample user's name and information sections appear after a successful response. | PASS |
| TC041 | Displays address and company information | Checks sample street, city, postcode, company name and catchphrase values. | PASS |
| TC042 | Handles API failure | Checks the error heading and message displayed when the request fails. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `mockFetchUserById.mockResolvedValue(mockUser)` | Simulates a successful response for one user. |
| `mockRejectedValue()` | Simulates an API request failure. |
| `findByRole()` | Finds an element after it appears. |
| `findByText()` | Finds text that appears asynchronously. |
| `beforeEach()` | Runs setup code before each test. |
| `new Promise(() => {})` | Creates a request that remains pending to test the loading state. |

**What this confirms:** The profile page displays the sample user's information and handles loading and failed requests.

### 6.3 NotFoundPage

**Test file:** `src/pages/NotFoundPage.test.tsx`  
**Purpose:** Check the not-found message and the link back to the dashboard.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC044 | Displays the page-not-found message | Checks the 404 page heading and explanatory text. | PASS |
| TC045 | Provides a link to the dashboard | Checks that the return link points to `/`. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `getByRole('heading', ...)` | Finds the page heading by its accessible role. |
| `getByText()` | Finds the explanatory message by its displayed text. |
| `getByRole('link')` | Finds the dashboard return link. |
| `toHaveAttribute('href', '/')` | Checks that the link destination is the home route. |

**What this confirms:** The not-found page provides a clear message and a way to return to the dashboard.

---

## 7. Favorites Service Testing

**Test file:** `src/services/favoritesService.test.ts`  
**Purpose:** Check saving and retrieving favorite user IDs from browser `localStorage`, including invalid stored data.

| Test ID | Test scenario | What the test checks | Result |
|---|---|---|---|
| TC049 | Returns an empty list when no favorites are saved | Checks the result when localStorage has no saved favorite data. | PASS |
| TC050 | Retrieves saved favorite IDs | Saves sample IDs and checks that they are returned correctly. | PASS |
| TC051 | Returns only numeric IDs | Checks that non-numeric values are ignored. | PASS |
| TC052 | Handles invalid JSON | Checks that malformed stored data returns an empty list. | PASS |
| TC053 | Handles non-array stored data | Checks that valid JSON which is not an array returns an empty list. | PASS |
| TC054 | Saves favorite IDs | Checks that the supplied IDs are saved in localStorage as JSON. | PASS |

**Code and concepts used**

| Code / method | Simple explanation in these tests |
|---|---|
| `localStorage.clear()` | Removes stored values so tests start with clean storage. |
| `localStorage.setItem()` | Stores sample data in browser storage. |
| `localStorage.getItem()` | Reads a value from browser storage. |
| `JSON.stringify()` | Converts JavaScript data into a JSON string for storage. |
| `JSON.parse()` | Converts a stored JSON string back into JavaScript data. |
| `beforeEach()` | Clears storage before each test. |
| `toEqual()` | Checks that the returned IDs match the expected array. |

**What this confirms:** Favorite IDs can be saved and retrieved, and the service safely handles malformed or unexpected stored data.

---

## 8. Test Execution Results

**Command used:**

```bash
npm test -- --runInBand
```

The following results were recorded from the completed Jest run.

| Test suite | Number of tests | Result |
|---|---:|---|
| SearchInput | 2 | PASS |
| Pagination component | 5 | PASS |
| UserCard | 4 | PASS |
| filterUsers | 7 | PASS |
| sortUsers | 5 | PASS |
| Pagination utilities | 6 | PASS |
| Users API | 4 | PASS |
| UserListPage | 5 | PASS |
| UserDetailPage | 4 | PASS |
| EmptyState | 1 | PASS |
| NotFoundPage | 2 | PASS |
| SortSelect | 3 | PASS |
| favoritesService | 6 | PASS |
| **Total** | **54** | **PASS** |

### Execution summary

- Test suites passed: **13**
- Test suites failed: **0**
- Tests passed: **54**
- Tests failed: **0**
- Snapshots: **0**

All 54 tests passed in the recorded coverage run.

---

## 9. Code Coverage Results

**Command used:**

```bash
npm run test:coverage -- --runInBand
```

### Overall coverage

| Coverage metric | Achieved | Assessment target | Status |
|---|---:|---:|---|
| Statements | **83.18%** | 70% | Achieved |
| Branches | **75.55%** | 70% | Achieved |
| Functions | **75.34%** | 70% | Achieved |
| Lines | **83.03%** | 70% | Achieved |

All four overall coverage metrics exceeded the assessment's 70% target.

### Coverage notes

Coverage is collected from the TypeScript and TSX files included by the Jest configuration. Test files, declaration files, the test setup file and the router test mocks are excluded from the coverage collection.

The overall percentages are project-wide. Some individual files, including application entry and route setup files, still have lower or zero coverage. This does not change the reported project-wide percentages, but those areas may be considered for additional tests if time permits.

### HTML coverage report

Jest generated the detailed HTML report at:

`coverage/lcov-report/index.html`

The report can be opened in a browser to review overall coverage and individual source files. Green lines indicate code executed by tests; uncovered or partially covered lines are highlighted separately.

**Coverage status: ACHIEVED — all four overall metrics are above 70%.**

---

## 10. Testing Evidence

The `testing-evidence/` folder contains screenshots of the test execution and coverage results, including:

- Jest test execution showing all 54 tests passing.
- Terminal coverage summary showing all four coverage percentages.
- HTML coverage overview.
- Page-level coverage overview.
- Detailed `UserListPage.tsx` coverage view.

These screenshots provide supporting evidence for the recorded test and coverage results.

---

## 11. Conclusion

The User Management Dashboard was tested using Jest and React Testing Library. A total of **54 tests across 13 test suites passed**. The tests cover the main components, utility functions, API functions, user-list and user-detail pages, and favorites storage.

The final project-wide coverage results were **83.18% statements, 75.55% branches, 75.34% functions and 83.03% lines**. All four coverage metrics exceeded the assessment target of 70%.

The test execution and coverage screenshots are stored in the `testing-evidence/` folder, and the detailed HTML report is available in `coverage/lcov-report/index.html`.
