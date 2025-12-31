"use client";
import { Home, Archive } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import LogoLight from "@/public/logo-light-theme.svg";
import LogoDark from "@/public/logo-dark-theme.svg";
import { TagsCheckbox } from "./tagscheckbox";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Archived",
    url: "/archived",
    icon: Archive,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-neutral-300 dark:border-neutral-500">
      <SidebarHeader>
        <div className="flex w-full justify-between">
          {" "}
          <Image
            src={LogoLight}
            alt="Bookmark Manager Logo"
            width={170}
            height={50}
            className="dark:hidden"
          />
          <Image
            src={LogoDark}
            alt="Bookmark Manager Logo"
            width={170}
            height={50}
            className="hidden dark:block"
          />
          <SidebarTrigger />
        </div>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild isActive={pathname === item.url}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <TagsCheckbox />
      </SidebarContent>
    </Sidebar>
  );
}
