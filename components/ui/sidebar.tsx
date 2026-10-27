"use client";

import { createContext, useContext, useEffect, useState, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type SidebarContextValue = { open: boolean; setOpen: (open: boolean) => void; toggle: () => void };
const SidebarContext = createContext<SidebarContextValue | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("Sidebar components must be used within SidebarProvider.");
  return context;
}

function SidebarProvider({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((value) => !value);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggle }}>
      <div className={cn("min-h-screen bg-muted/30 md:grid md:grid-cols-[240px_minmax(0,1fr)]", className)} {...props}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function Sidebar({ children, className, ...props }: HTMLAttributes<HTMLElement>) {
  const { open, setOpen } = useSidebar();
  return (
    <>
      <button type="button" aria-label="Close navigation menu" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className={cn("fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")} />
      <aside id="dashboard-sidebar" aria-label="Sidebar navigation" className={cn("fixed inset-y-0 left-0 z-50 flex w-[min(18rem,85vw)] flex-col border-r border-border bg-card shadow-xl transition-transform duration-200 md:sticky md:top-0 md:z-auto md:h-screen md:w-auto md:translate-x-0 md:shadow-none", open ? "translate-x-0" : "-translate-x-full", className)} {...props}>
        {children}
      </aside>
    </>
  );
}

function SidebarInset({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn("min-w-0", className)} {...props} />;
}

function SidebarTrigger({ className, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, toggle } = useSidebar();
  return (
    <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-controls="dashboard-sidebar" aria-expanded={open} onClick={(event) => { onClick?.(event); toggle(); }} className={cn("inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent md:hidden", className)} {...props} />
  );
}

function SidebarHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

function SidebarContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 px-5", className)} {...props} />;
}

function SidebarFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5", className)} {...props} />;
}

function SidebarMenu({ className, ...props }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-col gap-1", className)} {...props} />;
}

function SidebarMenuItem({ className, ...props }: HTMLAttributes<HTMLLIElement>) {
  return <li className={cn("min-w-0", className)} {...props} />;
}

function SidebarMenuButton({ children, className, onClick, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { children: ReactNode }) {
  const { setOpen } = useSidebar();
  return <a className={cn("flex items-center rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", className)} onClick={(event) => { onClick?.(event); setOpen(false); }} {...props}>{children}</a>;
}

export { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton };
