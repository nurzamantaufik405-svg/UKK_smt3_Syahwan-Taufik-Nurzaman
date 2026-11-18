import { Suspense } from "react"
import { redirect } from "next/navigation"
import { getAuthenticatedUser } from "@/lib/auth"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/app/components/sidebar/app-sidebar"
import { LogoutMenuAdmin } from "./logout-menu-admin"

async function AdminShell({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser()

  if (!user) {
    redirect("/")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex items-center justify-between border-b px-6 py-3">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-sm font-semibold">RxyuuTech.</span>
          </div>
          <LogoutMenuAdmin
            fullname={user.fullname}
            email={user.email}
            role={user.role}
          />
        </header>
        <main className="flex-1">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-muted-foreground">Memuat admin panel...</div>}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  )
}