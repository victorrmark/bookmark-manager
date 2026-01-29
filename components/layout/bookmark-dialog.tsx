"use client";

import { useState } from "react";
import {
  EllipsisVertical,
  ExternalLink,
  Copy,
  Pin,
  SquarePen,
  Archive,
  RotateCcw,
  Trash2,
} from "lucide-react";
import type { Bookmark } from "@/types/bookmark";
import { toast } from "sonner";
import {
  usePinBookmark,
  useArchiveBookmark,
  useDeleteBookmark,
  useMarkVisitedBookmark,
} from "@/hooks/useBookmark";

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
import EditBookmarkForm from "./editBookmark-form";
import Link from "next/link";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkMenuDialog({ bookmark }: BookmarkCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showArchiveDialog, setShowArchiveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [archiveId, setArchiveId] = useState<string>("");
  const [deleteId, setDeleteId] = useState<string>("");

  const { mutateAsync } = usePinBookmark();
  const { mutateAsync: mutateArchiveAsync, isPending: isArchiving } =
    useArchiveBookmark();
  const { mutateAsync: mutateDeleteAsync, isPending: isDeleting } =
    useDeleteBookmark();
  const { mutateAsync: mutateMarkVisitedAsync } = useMarkVisitedBookmark();

  const isArchived = bookmark.is_archived;
  const isPinned = bookmark.is_pinned;

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("Link copied to clipboard", {
      icon: <Copy className="text-teal-700 dark:text-white size-4" />,
    });
  };

  const pinBookmark = async (id: string) => {
    try {
      await mutateAsync(id);
      toast(isPinned ? "Bookmark unpinned" : "Bookmark pinned to top", {
        icon: <Pin className="text-teal-700 dark:text-white size-4" />,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "something went wrong";

      toast.error("Bookmark pin failed", {
        duration: 3000,
        description: message,
      });
      throw err;
    }
  };

  const archiveBookmark = async (id: string) => {
    try {
      await mutateArchiveAsync(id);
      toast(isArchived ? "Bookmark restored" : "Bookmark archived", {
        icon: isArchived ? (
          <RotateCcw className="text-teal-700 dark:text-white size-4" />
        ) : (
          <Archive className="text-teal-700 dark:text-white size-4" />
        ),
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "something went wrong";

      toast.error("Bookmark archive failed", {
        duration: 3000,
        description: message,
      });
    }
  };

  const markBookmarkVisited = async (id: string) => {
    try {
      await mutateMarkVisitedAsync(id);
    } catch (err) {

      throw err;
    }
  }

  const deleteBookmark = async (id: string) => {
    try {
      await mutateDeleteAsync(id);
      toast("Bookmark deleted.", {
        icon: <Trash2 className="text-teal-700 dark:text-white size-4" />,
      });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "something went wrong";

      toast.error("Bookmark delete failed", {
        duration: 3000,
        description: message,
      });

      throw err;
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

        <DropdownMenuContent className="w-48 right-[-15px] top-3 ring-1 ring-black/10 dark:bg-(--neutral-600)">
          <DropdownMenuGroup>
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noreferrer"
              className="block"
              onClick={() => {
                markBookmarkVisited(bookmark.id);
              }}
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
              {isPinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>

            {!isArchived && (
              <DropdownMenuItem
                className={dialogClass}
                onSelect={() => setShowEditDialog(true)}
              >
                <SquarePen className={iconClass} />
                Edit
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className={dialogClass}
              onSelect={() => {
                setArchiveId(bookmark.id);
                setShowArchiveDialog(true);
              }}
            >
              {isArchived ? (
                <RotateCcw className={iconClass} />
              ) : (
                <Archive className={iconClass} />
              )}
              {isArchived ? "Unarchive" : "Archive"}
            </DropdownMenuItem>

            {isArchived && (
              <DropdownMenuItem
                className={dialogClass}
                onSelect={() => {
                  setDeleteId(bookmark.id);
                  setShowDeleteDialog(true);
                }}
              >
                <Trash2 className={iconClass} />
                Delete Permanently
              </DropdownMenuItem>
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>


      {/* Dialog Box for editing bookmarks */}
      <EditBookmarkForm dialogOpen={showEditDialog} setDialogOpen={setShowEditDialog} bookmark={bookmark} />
      {/* <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Bookmark</DialogTitle>
            <DialogDescription className="text-set-4 font-medium text-neutral-800 dark:text-neutral-100">
              Update your saved link details — change the title, description, URL, or tags anytime.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}


      {/* Dialog Box for archiving and Unarchiving bookmarks */}
      <Dialog open={showArchiveDialog} onOpenChange={setShowArchiveDialog}>
        <DialogContent className="sm:max-w-[450px] gap-6">
          <DialogHeader>
            <DialogTitle className="text-set1 text-neutral-900 dark:text-white">
              {isArchived ? "Unarchive Bookmark" : "Archive Bookmark"}
            </DialogTitle>
            <DialogDescription className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
              {isArchived
                ? "Move this bookmark back to your active list?"
                : "Are you sure you want to archive this bookmark?"}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex sm:items-center sm:justify-end gap-8">
            <DialogClose
              asChild
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-neutral-400 dark:border-neutral-400 cursor-pointer hover:text-teal-700 dark:hover:text-neutral-100"
            >
              <Button disabled={isArchiving}>Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => archiveBookmark(archiveId)}
              type="submit"
              disabled={isArchiving}
              className=" text-set3 flex-1 sm:flex-initial px-5 py-2.5 bg-teal-700 hover:bg-teal-800 cursor-pointer text-white"
            >
              {isArchived ? "Unarchive" : "Archive"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Box for Deleting bookmarks */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[450px] gap-6">
          <DialogHeader>
            <DialogTitle className="text-set1 text-neutral-900 dark:text-white">
              Delete bookmark
            </DialogTitle>
            <DialogDescription className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
              Are you sure you want to delete this bookmark?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex sm:items-center sm:justify-end gap-8">
            <DialogClose
              asChild
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-neutral-400 dark:border-neutral-400 cursor-pointer hover:text-teal-700 dark:hover:text-neutral-100"
            >
              <Button disabled={isDeleting}>Cancel</Button>
            </DialogClose>
            <Button
              onClick={() => deleteBookmark(deleteId)}
              type="submit"
              disabled={isDeleting}
              className=" text-set3 flex-1 sm:flex-initial px-5 py-2.5 bg-red-800 hover:bg-red-900 cursor-pointer text-white"
            >
              {isDeleting ? "Deleting..." : "Delete permanently"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
