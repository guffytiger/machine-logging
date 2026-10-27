"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { RiArrowDownSLine, RiBuilding2Line, RiComputerLine, RiDashboardLine, RiLogoutBoxRLine, RiSettings3Line } from "@remixicon/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [manageOpen, setManageOpen] = useState(pathname.startsWith("/admin"));
  const name = session?.user?.name ?? "User";
  const email = session?.user?.email ?? "";
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "U";

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-3 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-6">
              <path d="M5 19V8.5L12 5l7 3.5V19l-7 3-7-3Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
              <path d="M5 9l7 3.5L19 9M12 12.5V22M8.5 7.25v4M15.5 7.25v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold tracking-tight">Machine Logging</span>
            <span className="mt-0.5 block text-xs font-normal text-muted-foreground">Operations</span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="overflow-y-auto">
        <nav aria-label="Main navigation" className="space-y-6">
          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Workspace</p>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/dashboard" aria-current={pathname === "/dashboard" ? "page" : undefined} className={pathname === "/dashboard" ? "bg-sidebar-accent text-sidebar-accent-foreground" : undefined}>
                  <RiDashboardLine aria-hidden="true" className="size-4 mx-2" />Overview
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/machines" aria-current={pathname.startsWith("/machines") ? "page" : undefined} className={pathname.startsWith("/machines") ? "bg-sidebar-accent text-sidebar-accent-foreground" : undefined}>
                  <RiComputerLine aria-hidden="true" className="size-4 mx-2" />Machines
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/hospitals" aria-current={pathname.startsWith("/hospitals") ? "page" : undefined} className={pathname.startsWith("/hospitals") ? "bg-sidebar-accent text-sidebar-accent-foreground" : undefined}>
                  <RiBuilding2Line aria-hidden="true" className="size-4 mx-2" />Hospital
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </div>

          <div>
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin panel</p>
            <SidebarMenu>
              <SidebarMenuItem>
                <button type="button" aria-expanded={manageOpen} onClick={() => setManageOpen((open) => !open)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                  <RiSettings3Line aria-hidden="true" className="size-4 mx-1" />
                  <span>Manage</span>
                  <RiArrowDownSLine aria-hidden="true" className={`ml-auto size-4 transition-transform ${manageOpen ? "rotate-180" : ""}`} />
                </button>
                {manageOpen && (
                  <ul className="ml-5 mt-1 space-y-1 border-l border-border pl-3">
                    <li><SidebarMenuButton href="/admin/hospitals" aria-current={pathname.startsWith("/admin/hospitals") ? "page" : undefined}>Manage Hospital</SidebarMenuButton></li>
                    <li><SidebarMenuButton href="/admin/machines" aria-current={pathname.startsWith("/admin/machines") ? "page" : undefined}>Manage Machine</SidebarMenuButton></li>
                    <li><SidebarMenuButton href="/admin/users" aria-current={pathname.startsWith("/admin/users") ? "page" : undefined}>Manage Users</SidebarMenuButton></li>
                  </ul>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </div>
        </nav>
      </SidebarContent>
      <SidebarFooter>
        <div className="rounded-xl border border-border bg-muted/30 p-2">
          <p className="mb-2 px-1 text-xs font-medium text-muted-foreground">Profile</p>
          <div className="flex items-center gap-2.5">
            <Avatar>
              {session?.user?.image && <AvatarImage src={session.user.image} alt={`${name}'s profile picture`} />}
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
              <span className="min-w-0 flex-1 truncate text-sm font-medium">{name}</span>
              <span className="min-w-0 flex-1 truncate text-xs">{email}</span>
            </div>
            <Button type="button" variant="ghost" size="icon-sm" aria-label="Log out" title="Log out" onClick={() => signOut({ callbackUrl: "/auth" })}>
              <RiLogoutBoxRLine aria-hidden="true" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
