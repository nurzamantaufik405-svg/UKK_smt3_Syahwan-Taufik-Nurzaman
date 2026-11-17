"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export function LogoutMenuItem() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleLogout() {
    if (isLoggingOut) return
    setIsLoggingOut(true)

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      })

      if (response.ok) {
        router.push("/")
        router.refresh()
      }
    } catch (error) {
      console.error("Gagal logout:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <DropdownMenuItem
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="cursor-pointer text-red-600 focus:text-red-600"
    >
      <LogOut className="mr-2 size-4" />
      <span>{isLoggingOut ? "Keluar..." : "Log out"}</span>
    </DropdownMenuItem>
  )
}