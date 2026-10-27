"use client";

import { useEffect, useRef, useState } from "react";
import { RiBuilding2Line, RiComputerLine, RiDashboardLine, RiHomeLine, RiSearchLine } from "@remixicon/react";
import type { RemixiconComponentType } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

type CommandData = {
  label: string;
  icon: RemixiconComponentType;
  shortcut?: string;
  detail?: string;
  badge?: string;
};

const commandGroups: { heading: string; items: CommandData[] }[] = [
  {
    heading: "Navigation",
    items: [
      { label: "Home", icon: RiHomeLine, shortcut: "⌘H" },
      { label: "Dashboard", icon: RiDashboardLine },
    ],
  },
  {
    heading: "Hospital",
    items: [
      { label: "Some Hospital", detail: "DS-000-00000", badge: "DentiiScan Trio", icon: RiBuilding2Line },
    ],
  },
  {
    heading: "Machines",
    items: [
      { label: "Machine_ID", icon: RiComputerLine },
    ],
  },
  {
    heading: "Machines Type",
    items: [
      { label: "Machine Type", icon: RiComputerLine },
    ],
  },
];

export function SearchCommands() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !containerRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, [open]);

  return (
    <div ref={containerRef} className="relative w-64 md:w-xl">
      <Button
        type="button"
        variant="outline"
        aria-label="Search commands"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="w-full justify-start gap-2 font-normal text-muted-foreground"
      >
        <RiSearchLine aria-hidden="true" className="size-4" />
        <span>Search commands...</span>
        <CommandShortcut className="ml-auto">⌘K</CommandShortcut>
      </Button>
      {open && (
        <Command
        className="absolute left-[calc((16rem-100vw)/2+0.5rem)] top-full z-50 -mt-10 !h-auto !w-[calc(100vw-1.5rem)] !overflow-hidden rounded-xl border border-border bg-popover p-1 text-popover-foreground shadow-lg sm:left-0 sm:!w-full"
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
        >
          <CommandInput autoFocus placeholder="Type a command or search..." />
          <CommandList className="max-h-[calc(100svh-6rem)] sm:max-h-72">
            <CommandEmpty>No results found.</CommandEmpty>
            {commandGroups.map((group, groupIndex) => (
              <div key={group.heading}>
                {groupIndex > 0 && <CommandSeparator />}
                <CommandGroup heading={group.heading}>
                  {group.items.map(({ label, icon: Icon, shortcut, detail, badge }) => (
                    <CommandItem key={label} value={`${label} ${detail ?? ""} ${badge ?? ""}`} onSelect={() => setOpen(false)} className={detail ? "min-h-14 items-center" : undefined}>
                      <Icon aria-hidden="true" />
                      {detail ? (
                        <span className="flex min-w-0 flex-col items-start gap-1 py-1">
                          <span className="font-medium leading-none">{label}</span>
                          <span className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{detail}</span>
                            {badge && <span className="rounded-full border border-border bg-muted px-2 py-0.5 leading-none">{badge}</span>}
                          </span>
                        </span>
                      ) : (
                        <span>{label}</span>
                      )}
                      {shortcut && <CommandShortcut>{shortcut}</CommandShortcut>}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </div>
            ))}
          </CommandList>
        </Command>
      )}
    </div>
  );
}
