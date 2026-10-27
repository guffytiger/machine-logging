"use client";

import { RiGalleryView2, RiMenuLine } from "@remixicon/react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { SearchCommands } from "./CommandManyItems";

export function Appbar() {
  const { data: session } = useSession();
  const name = session?.user?.name ?? "User";
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b border-border bg-card px-4 py-3 md:px-6">
      <SidebarTrigger>
        <RiMenuLine aria-hidden="true" className="size-4 text-current/50" />
      </SidebarTrigger>
      <SearchCommands />
      <div className="flex items-center gap-3">
        <Avatar>
          {session?.user?.image && <AvatarImage src={session.user.image} alt={`${name}'s profile picture`} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
