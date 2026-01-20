"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  ExternalLink,
  Copy,
  Pin,
  SquarePen,
  Archive,
} from "lucide-react";
import type { Bookmark } from "@/types/bookmark";
import { toast } from "sonner";
import { usePinBookmark } from "@/hooks/useBookmark";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkMenuDialog({ bookmark }: BookmarkCardProps) {
  const [showEditDialog, setEditDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);

  const { mutateAsync } = usePinBookmark();

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard", {
      icon: <Copy className="text-teal-700 dark:text-white size-4" />,
    });
  };

  const pinBookmark = async (id: string) => {
    try {
      await mutateAsync(id);
      toast("Bookmark added successfully", {
        icon: <Pin className="text-teal-700 dark:text-white size-4" />,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "something went wrong";

      toast.error("Bookmark pin failed", {
        duration: 3000,
        description: message,
      });
      console.log(err);
    }
  };

  const dialogClass =
    "group p-2 text-set4 text-neutral-800 dark:text-neutral-100 cursor-pointer hover:text-neutral-900 hover:dark:text-neutral-200 focus:bg-neutral-100 dark:focus:bg-teal-700 ";
  const iconClass =
    "inline-block w-4 h-4 mr-1.5 text-neutral-800 dark:text-neutral-100 group-hover:text-neutral-900 group-hover:dark:text-neutral-200 ";

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            aria-label="Open menu"
            className="p-1.5 cursor-pointer focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-(--neutral-800) ring-offset-2"
          >
            <EllipsisVertical className="size-5" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-40 right-[-15px] top-3 ring-1 ring-black/10 dark:bg-(--neutral-600)">
          <DropdownMenuGroup>
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <DropdownMenuItem className={dialogClass}>
                <ExternalLink className={iconClass} />
                Visit
              </DropdownMenuItem>
            </Link>

            <DropdownMenuItem
              className={dialogClass}
              onSelect={() => copyToClipboard(bookmark.url)}
            >
              <Copy className={iconClass} />
              Copy URL
            </DropdownMenuItem>

            <DropdownMenuItem
              className={dialogClass}
              onSelect={() => pinBookmark(bookmark.id)}
            >
              <Pin className={iconClass} />
              Pin
            </DropdownMenuItem>
            <DropdownMenuItem
              className={dialogClass}
              onSelect={() => setEditDialog(true)}
            >
              <SquarePen className={iconClass} />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className={dialogClass}
              onSelect={() => setShowArchiveDialog(true)}
            >
              <Archive className={iconClass} />
              Archive
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showEditDialog} onOpenChange={setEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New File</DialogTitle>
            <DialogDescription>
              Provide a name for your new file. Click create when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share File</DialogTitle>
            <DialogDescription>
              Anyone with the link will be able to view this file.
            </DialogDescription>
          </DialogHeader>
          <p>This is header</p>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit">Send Invite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
