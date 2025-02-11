import type { User, NewUser } from "@/types/user"
import { revalidatePath } from "next/cache"

const API_URL = "https://jsonplaceholder.typicode.com/users"

export async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error("Failed to fetch users")
    const users = await res.json()
    return users.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      department: user.company?.name || "N/A",
    }))
  } catch (error) {
    console.error("Error fetching users:", error)
    throw new Error("Failed to fetch users")
  }
}

export async function addUser(user: NewUser): Promise<User> {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) throw new Error("Failed to add user")
    const newUser = await res.json()
    revalidatePath("/")
    return newUser
  } catch (error) {
    console.error("Error adding user:", error)
    throw new Error("Failed to add user")
  }
}

export async function updateUser(id: number, user: NewUser): Promise<User> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok) throw new Error("Failed to update user")
    const updatedUser = await res.json()
    revalidatePath("/")
    return updatedUser
  } catch (error) {
    console.error("Error updating user:", error)
    throw new Error("Failed to update user")
  }
}

export async function deleteUser(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })
    if (!res.ok) throw new Error("Failed to delete user")
    revalidatePath("/")
  } catch (error) {
    console.error("Error deleting user:", error)
    throw new Error("Failed to delete user")
  }
}

