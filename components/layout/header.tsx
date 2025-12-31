import { SidebarTrigger } from "@/components/ui/sidebar";
import { Search, Plus } from "lucide-react";
import { UserAvatar } from "./avatar";
import AddBookmark from "./addBookmark";

export default function Header() {
  return (
    <header
      className="
        fixed top-0 right-0 z-50
        w-full lg:w-[calc(100%-18.5rem)] lg:left-[18.5rem]
        bg-white border-b border-neutral-300
        dark:bg-neutral-800 dark:border-neutral-500
        px-4 py-8 sm:px-8 sm:py-4
        flex items-center justify-between
      "
    >
      <div className="flex items-center gap-4">
        {/* Hamburger visible on mobile only */}
        <SidebarTrigger className="lg:hidden" />

        <div className="relative w-[193px] sm:w-[320px]">
          <Search className="absolute inset-y-2.5 left-2.5 size-5 pointer-events-none text-neutral-800 dark:text-neutral-100" />
          <input
            type="text"
            placeholder="Search by title..."
            className="
              w-full rounded-md border-2
              border-neutral-300 dark:border-neutral-500
              dark:bg-(--neutral-600)
              pl-9 pr-4 py-2
              hover:bg-neutral-100 dark:hover:bg-neutral-500
              focus:outline-none focus:ring-2
              focus:ring-teal-700 dark:ring-neutral-100
              ring-offset-white dark:ring-offset-neutral-800 ring-offset-2
            "
          />
        </div>
      </div>

      <div className="flex items-center gap-3.5">
        {/* <button
          type="button"
          className="
            flex items-center gap-2
            bg-teal-700 text-white
            p-2.5 sm:px-4 sm:py-3
            rounded-md hover:bg-teal-800
            focus:outline-none focus:ring-2
            focus:ring-teal-700 dark:ring-neutral-100
            ring-offset-white dark:ring-offset-neutral-800 ring-offset-2
          "
        >
          <Plus className="size-5" />
          <p className="hidden md:block text-set3">Add Bookmark</p>
        </button> */}
        <AddBookmark />
        <UserAvatar />
      </div>
    </header>
  );

  // return (
  // <div className="bg-white border-b border-neutral-300 dark:bg-neutral-800 dark:border-neutral-500 w-full px-4 py-8 sm:px-8 sm:py-4 flex items-center justify-between">
  //   <div className="flex items-center gap-4 sm:gap-4">
  //     <SidebarTrigger />
  //     <div className="relative w-[193px] sm:w-[320px]">
  //       <Search className="text-neutral-800 dark:text-neutral-100 absolute inset-y-2.5 left-2.5 pointer-events-none size-5" />
  //       <input
  //         type="text"
  //         placeholder="Search by title..."
  //         className="border-2 border-neutral-300 dark:border-neutral-500 dark:bg-(--neutral-600) rounded-md pl-9 pr-4 py-2 w-full focus:outline-none focus:ring-2
  //         focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2 hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
  //       />
  //     </div>
  //   </div>
  
  //   <div className="flex items-center gap-3.5">
  //     <button
  //       type="button"
  //       className="flex items-center gap-2 bg-teal-700 text-white p-2.5 sm:px-4 sm:py-3 rounded-md hover:bg-teal-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2"
  //     >
  //       <Plus className="size-5 text-white " />
  //       <p className="hidden md:block text-white text-set3">Add Bookmark</p>
  //     </button>
  //     <UserAvatar />
  
  //   </div>
  // </div>
  // )
}

