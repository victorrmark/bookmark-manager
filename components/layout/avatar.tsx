"use client";
import { supabase } from "@/lib/supabase"
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LogOut, Palette, CircleUserRound } from "lucide-react";
import { logoutAction } from "@/app/actions/authActions";
import { useProfile } from "@/hooks/useProfile"
import { ThemeToggle } from "@/components/layout/themeToggle";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import ChangeAvatar from "./change-avatar";
import { UserMetadata } from "@supabase/supabase-js"
import { AVATARS } from '@/lib/avatar';
import {useUserContext} from "@/app/(dashboard)/UserContext";



export function UserAvatar() {
  const { user } = useUserContext()
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const [openDialog, setOpenDialog] = useState(false);
  const { data: profile, } = useProfile()

  const avatarURL = AVATARS.find(avatar => avatar.id === profile?.avatar_id)?.src


  return (
    <>
      <Popover>
        <PopoverTrigger className="rounded-full focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 cursor-pointer ring-offset-white dark:ring-offset-(--neutral-800) ring-offset-2 focus:outline-none data-[state=open]:ring-2 data-[state=open]:ring-teal-700 dark:data-[state=open]:ring-neutral-100">
          <Avatar>
            <AvatarImage src={avatarURL} alt="User Avatar" />
            <AvatarFallback>{user?.user_metadata?.display_name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="border-neutral-100 bg-white dark:bg-(--neutral-600) dark:border-neutral-500 shadow-md ">
          <div className="flex px-4 py-3 items-center gap-3">
            <Avatar>
              <AvatarImage src={avatarURL} alt="User Avatar" />
              <AvatarFallback>{user?.user_metadata?.display_name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-set4 font-semibold text-neutral-900 dark:text-white">
                {user?.user_metadata?.display_name || "User"}
              </p>
              <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
                {user?.email}
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
            aria-label="change avatar"
            tabIndex={0}
            onClick={() => setOpenDialog(true)}
          >
            <CircleUserRound className="h-4 w-4 text-neutral-800 dark:text-neutral-100" />
            <p className="text-neutral-800 dark:text-neutral-100 text-set4 font-semibold">
              Change Avatar
            </p>
          </Button>

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

      <ChangeAvatar open={openDialog} setOpen={setOpenDialog} userId={user?.id} />
    </>

  );
}
