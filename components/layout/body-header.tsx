"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownUp } from "lucide-react";
import { usePathname } from "next/navigation";
import { useBookmarkContext } from "@/app/(dashboard)/BookmarkContext";


export default function BodyHeader() {
  const { sortBy, setSortBy } = useBookmarkContext();
  const pathname = usePathname();


  return (
    <DropdownMenu>
      <div className="flex w-full gap-0.5 items-center">
        <p className="text-set1 flex-1 text-neutral-900 font-medium dark:text-white ">
          {pathname === "/home" && "All bookmarks"}
          {pathname === "/archived" && "Archived bookmarks"}
        </p>

        <DropdownMenuTrigger asChild>
          <button className=" flex cursor-pointer items-center text-neutral-900 dark:text-white  font-medium py-2.5 px-3 rounded-xl gap-1 outline outline-neutral-400 dark:outline-neutral-500 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-(--neutral-600) transition duration-200 focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-(--neutral-800) ring-offset-2 ">
            <ArrowDownUp className="size-5" />
            <p className="text-set3">Sort by</p>
          </button>
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent className="w-49 right-[-50] top-2 border border-neutral-100 dark:border-(--neutral-500) bg-white dark:bg-(--neutral-600) text-neutral-800 dark:text-neutral-100 p-2 gap-1 rounded-xl ">
        <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
          <DropdownMenuRadioItem
            value="recent"
            className="sort-items"
          >
            Recently added
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="lastVisited"
            className="sort-items"
          >
            Recently visited
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="mostVisited"
            className="sort-items"
          >
            Most visited
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
