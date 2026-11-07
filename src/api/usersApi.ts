
import type { User } from '../types/user'

// API URL provided in our assessment
const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

// Function to fetch all users
export async function fetchUsers(): Promise<User[]> {

  // Send a request to the API
  const response = await fetch(USERS_API_URL)

  // Check whether the request was successful
  if (!response.ok) {
    throw new Error('Failed to fetch users')
  }

  // Convert the API response into JavaScript data
  const data: User[] = await response.json()

  // Return all users
  return data
}

// Function to fetch one user using their ID
export async function fetchUserById(id: number): Promise<User> {

  // Create the URL using the user ID
  const response = await fetch(`${USERS_API_URL}/${id}`)

  // Check whether the request was successful
  if (!response.ok) {
    throw new Error('Failed to fetch user')
  }

  // Convert the response into a User object
  const data: User = await response.json()

  // Return the user
  return data
}
