"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getIconComponent } from "@/lib/icon-map";

const listMenu = [
  {
    name: "Dashboard",
    url: "/admin",
    icon: "dashboard", // Verify this matches the exact key in your icon-map
  },
  {
    name: "User Management",
    url: "/admin/user-management",
    icon: "users",
  },
  {
    name: "Profile",
    url: "/admin/profile",
    icon: "user",
  },
];

interface AppSidebarProps {
  user: {
    fullname: string;
    email: string;
    role?: string;
  };
  onLogout?: () => Promise<void> | void;
}




export function AppSidebar({ user, onLogout }: AppSidebarProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fullname = user?.fullname || "User";
  const email = user?.email || "user@example.com";
  const role = user?.role || "admin";
  const initials = fullname
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await onLogout?.();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  RXYUUtech.
                  <ChevronDown className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-popper-anchor-width]">
                <DropdownMenuItem>
                  <span>PYROTECH.BIZ.ID</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-emerald-950 px-2 pt-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu>
              {listMenu.map((menu) => {
                const IconComponent = getIconComponent(menu.icon);
                return (
                  <SidebarMenuItem key={menu.name}>
                    <SidebarMenuButton
                      asChild
                      className="my-0.5 w-full rounded-lg px-3 py-2.5 text-zinc-400 transition-all duration-150 hover:bg-zinc-800/70 hover:text-white active:bg-zinc-800"
                    >
                      <Link href={menu.url} className="flex items-center gap-3">
                        {IconComponent && <IconComponent className="size-4" />}
                        <span className="text-sm font-medium">{menu.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User2 />
              <span>RXyuu</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
