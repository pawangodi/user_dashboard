import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { UserForm } from "@/components/user-form"
import { UserTable } from "@/components/user-table"
import  { User } from "@/types/user"
import { getUsers } from "./actions"

export default function Page() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | undefined>()

  async function fetchUsers() {
    try {
      setLoading(true)
      const data = await getUsers()
      setUsers(data)
      setError(null)
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch users")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, []) //This line was already correct, no changes needed.  The update was pointing to the wrong line.

  function handleEdit(user: User) {
    setSelectedUser(user)
    setFormOpen(true)
  }

  function handleAdd() {
    setSelectedUser(undefined)
    setFormOpen(true)
  }

  if (error) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Something went wrong</h2>
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={fetchUsers} className="mt-4">
            Try again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-sm text-muted-foreground">Manage your team members and their account permissions here.</p>
        </div>
        <Button onClick={handleAdd}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {loading ? (
        <div className="flex h-[450px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-lg font-semibold">Loading users...</h2>
            <p className="text-sm text-muted-foreground">Please wait while we fetch the user data.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <UserTable users={users} onEdit={handleEdit} onDelete={fetchUsers} />
        </div>
      )}

      <UserForm open={formOpen} onOpenChange={setFormOpen} user={selectedUser} onSuccess={fetchUsers} />
    </div>
  )
}

