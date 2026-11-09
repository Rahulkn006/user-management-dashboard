# User Management Dashboard

## 🌐 Live Demo

[View User Management Dashboard](https://user-management-dashboard-liart-psi.vercel.app)

A responsive User Management Dashboard built with React, TypeScript and Vite. The application allows users to browse, search, filter, sort and manage user information through a clean and responsive interface.

## Project Overview

The User Management Dashboard retrieves user information from the JSONPlaceholder API and presents it in an organized directory.

It includes user profile pages, search and filtering functionality, sorting, pagination, persistent favorites and a dark mode interface.

## Features

### User Management
- Fetch and display users from the JSONPlaceholder API.
- Display user information including name, username, email, phone, website, company and city.
- View detailed user profiles.
- Display address, geographic coordinates and company information.

### Search and Filtering
- Search users by name, username or email.
- Real-time search with a 400ms debounce.
- Filter users by city.
- Filter users by company.
- Combine search and filters.

### Sorting and Pagination
- Sort users by name, username or email.
- Support ascending and descending order.
- Display five users per page.
- Navigate between pages using Previous and Next controls.

### Favorites
- Add or remove users from favorites.
- Display the total number of favorites.
- Save favorite selections using browser localStorage.
- Preserve favorites after refreshing the page.

### Interface and Performance
- Responsive layout for mobile, tablet and desktop.
- Light and dark mode with saved theme preference.
- Loading skeletons and API error handling.
- Empty search and filter results state.
- Lazy-loaded user detail page using React.lazy and Suspense.
- Reusable components and organized project structure.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | User interface development |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| Tailwind CSS | Styling and responsive design |
| React Router | Client-side routing |
| Fetch API | API requests |
| Jest | Automated test execution |
| React Testing Library | Component testing |
| Jest DOM | DOM assertions |
| User Event | Simulating user interactions |
| ESLint | Code quality checks |
| Prettier | Code formatting |

## API Integration

The application uses the JSONPlaceholder Users API:

`https://jsonplaceholder.typicode.com/users`

The application retrieves users through Fetch API and handles successful responses and request failures.

## Project Structure

```text
interntask/
│
├── public/
│
├── src/
│   ├── api/
│   │   ├── usersApi.ts
│   │   └── usersApi.test.ts
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── SearchInput.tsx
│   │   ├── FilterBar.tsx
│   │   ├── SortSelect.tsx
│   │   ├── UserCard.tsx
│   │   ├── UserGrid.tsx
│   │   ├── Pagination.tsx
│   │   ├── LoadingState.tsx
│   │   ├── ErrorState.tsx
│   │   └── EmptyState.tsx
│   │
│   ├── hooks/
│   │   └── useDebounce.ts
│   │
│   ├── pages/
│   │   ├── UserListPage.tsx
│   │   ├── UserDetailPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── routes/
│   │   └── AppRoutes.tsx
│   │
│   ├── services/
│   │   └── favoritesService.ts
│   │
│   ├── types/
│   │   ├── user.ts
│   │   └── sorting.ts
│   │
│   ├── utils/
│   │   ├── filterUsers.ts
│   │   ├── sortUsers.ts
│   │   └── pagination.ts
│   │
│   ├── test-mocks/
│   ├── setupTests.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
│
├── testing-evidence/
├── coverage/
├── jest.config.cjs
├── TESTING_REPORT.md
├── package.json
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project folder

```bash
cd interntask
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## Available Commands

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Builds the production application |
| `npm run preview` | Previews the production build |
| `npm run lint` | Runs ESLint checks |
| `npm test -- --runInBand` | Executes automated tests |
| `npm run test:coverage -- --runInBand` | Runs tests and generates coverage |

## Testing

Automated testing was implemented using Jest and React Testing Library.

The tests cover:

- Component rendering and user interactions.
- Search and filtering functionality.
- Sorting and pagination utilities.
- API success and failure scenarios.
- User list loading, search and filtering.
- User detail page information and error handling.
- Favorites storage and retrieval.

### Test Execution Results

| Testing Metric | Result |
|---|---:|
| Test suites passed | 13 |
| Total tests passed | 54 |
| Failed tests | 0 |

### Code Coverage Results

Coverage was generated using Jest.

| Coverage Metric | Achieved |
|---|---:|
| Statements | 83.18% |
| Branches | 75.55% |
| Functions | 75.34% |
| Lines | 83.03% |

All four overall coverage metrics exceeded the assessment's minimum requirement of 70%.

The detailed HTML coverage report is generated inside:

`coverage/lcov-report/index.html`

For additional testing details, refer to [TESTING_REPORT.md](./TESTING_REPORT.md).

## Testing Evidence

The `testing-evidence` folder contains screenshots documenting:

- Successful automated test execution.
- Terminal code coverage results.
- HTML coverage overview.
- Individual source file coverage.

## Code Quality

The project follows a modular component-based structure with TypeScript interfaces, reusable React components, utility functions and separate API and service modules.

ESLint is used to check code quality, and the production build is verified using Vite and TypeScript.

## Author

Developed as part of a Frontend Development internship assessment.

## License

This project was developed for educational and assessment purposes.