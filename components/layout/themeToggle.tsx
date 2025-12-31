// "use client"

// import * as React from "react"
// import { Moon, Sun } from "lucide-react"
// import { useTheme } from "next-themes"

// import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"

// export function ModeToggle() {
//   const { setTheme } = useTheme()

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="outline" size="icon">
//           <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
//           <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
//           <span className="sr-only">Toggle theme</span>
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={() => setTheme("light")}>
//           Light
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("dark")}>
//           Dark
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={() => setTheme("system")}>
//           System
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Laptop } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const items = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    // { value: "system", label: "System", icon: Laptop },
  ];

  return (
    <div
      className="flex bg-neutral-300 dark:bg-neutral-500 rounded-lg p-0.5 focus:ring-2 focus:ring-teal-700 
                  dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2 focus:outline-none"
      role="radiogroup"
      aria-label="Theme"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setTheme((prev) => (prev === "light" ? "dark" : "light"));
        }
      }}
    >
      {items.map(({ value, icon: Icon }) => {
        const selected = theme === value;
        return (
          <Button
            key={value}
            role="radio"
            aria-checked={selected}
            tabIndex={-1}
            // tabIndex={selected ? 0 : -1}
            // variant={theme === value ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-2 px-2.5 py-2.5 rounded-lg transition-all duration-500 cursor-pointer",
              // theme === value && "font-medium",
              theme === value
                ? "bg-white dark:bg-(--neutral-600) text-neutral-900 dark:text-white"
                : "bg-transparent text-neutral-800 dark:text-neutral-100 "
            )}
            onClick={() => setTheme(value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setTheme(value);
              }
            }}
          >
            <Icon className={cn("h-6 w-6 text-neutral-900 dark:text-white")} />
          </Button>
        );
      })}
    </div>
  );
}
