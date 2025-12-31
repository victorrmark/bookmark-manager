"use client";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Palette } from "lucide-react";
import { logoutAction } from "@/app/actions/authActions";
import { ThemeToggle } from "@/components/layout/themeToggle";
import { useForm } from "react-hook-form";

export function UserAvatar() {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();

  return (
    <Popover>
      <PopoverTrigger className="rounded-full focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-(--neutral-800) ring-offset-2 focus:outline-none data-[state=open]:ring-2 data-[state=open]:ring-teal-700 dark:data-[state=open]:ring-neutral-100">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="border-neutral-100 bg-white dark:bg-(--neutral-600) dark:border-neutral-500 focus:outline-red-500 ">
        <div className="flex px-4 py-3 items-center gap-3">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-set4 font-semibold text-neutral-900 dark:text-white">
              Emily Carter
            </p>
            <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
              emily101@example.com
            </p>
          </div>
        </div>

        <Separator className="dark:bg-neutral-500 bg-neutral-100" />

        <div className="w-full px-3.5 py-2 flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-neutral-800 dark:text-neutral-100" />
            <p className="text-neutral-800 dark:text-neutral-100 text-set4 font-semibold">
              Theme
            </p>
          </div>
          <ThemeToggle />
        </div>

        <Separator className="dark:bg-neutral-500 bg-neutral-100" />

        <Button
          className="w-full justify-start gap-2 cursor-pointer px-3 py-3.5 m-0.5 hover:bg-neutral-100 dark:hover:bg-(--neutral-500) focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2 focus:outline-none"
          type="submit"
          aria-label="Logout"
          aria-busy={isSubmitting}
          disabled={isSubmitting}
          tabIndex={0}
          onClick={handleSubmit(logoutAction)}
        >
          <LogOut className="h-4 w-4 text-neutral-800 dark:text-neutral-100" />
          <p className="text-neutral-800 dark:text-neutral-100 text-set4 font-semibold">
            {isSubmitting ? "Logging out..." : "Logout"}
          </p>
        </Button>
      </PopoverContent>
    </Popover>
  );
}
