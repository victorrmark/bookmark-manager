import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkMenuDialog } from "./bookmark-dialog";
import type { Bookmark } from "@/types/bookmark";
import { EllipsisVertical, Pin, Eye, Clock, Calendar } from "lucide-react";
import Image from "next/image";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const url = new URL(bookmark.url).hostname;
  const imageSrc = bookmark.favicon_url;

  const formattedDate = (date: string) => {

    return new Date(date).toLocaleDateString(
      "en-GB",
      { day: "numeric", month: "short" }
    );
  }


  const bookmarkInfo = [
    { label: "Visits", value: bookmark.visit_count, icon: Eye },
    { label: "Created", value: formattedDate(bookmark.created_at), icon: Calendar },
    {
      label: "Last Visited",
      value: bookmark.last_visited ? formattedDate(bookmark.last_visited) : "Never",
      icon: Clock,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex items-start">
        <Image
          src={imageSrc}
          width={20}
          height={20}
          alt={`${bookmark.title} favicon`}
          className="w-12 h-12 rounded-xl outline outline-neutral-100 "
        />
        <div className=" flex-1 flex flex-col justify-between gap-1.5">
          <CardTitle className="text-set2 text-neutral-900 dark:text-white">
            {bookmark.title}
          </CardTitle>
          <CardDescription className="dark:text-neutral-100">
            {url}
          </CardDescription>
        </div>

        <div className="group rounded-[6px] outline-2 outline-neutral-400 dark:outline-(--neutral-500) hover:bg-neutral-100 dark:hover:bg-(--neutral-600) focus:bg-neutral-100 dark:focus:bg-(--neutral-700)">
          <BookmarkMenuDialog bookmark={bookmark} />
        </div>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>

      <CardContent className="flex flex-col gap-4 min-h-[170px]">
        <p className="text-neutral-800 dark:text-neutral-100">
          {bookmark.description}
        </p>
        <div className="flex flex-wrap gap-x-1.5 gap-y-px mt-auto">
          {bookmark.bookmark_tags.map((item) => (
            <span
              key={item.tags.id}
              className="text-set5 text-neutral-800 bg-neutral-100 dark:text-neutral-100 dark:bg-(--neutral-600) inline-block rounded-lg px-2 py-0.5 mb-2"
            >
              {item.tags.tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="mt-auto border-t border-neutral-300 dark:border-nuetral-500">
        <div aria-label="bookmark info" className="flex flex-1 gap-4">
          {bookmarkInfo.map((info) => (
            <div
              key={info.label}
              aria-label={info.label}
              className="items-center font-medium text-set5 text-neutral-800 dark:text-neutral-100 flex gap-1.5"
            >
              <info.icon className="size-4" />
              <span className="text-set5 ">{info.value}</span>
            </div>
          ))}
        </div>

        {bookmark.is_pinned && (
          <Pin className="size-4 text-neutral-800 dark:text-neutral-100 mr-auto" />
        )}
      </CardFooter>
    </Card>
  );
}
