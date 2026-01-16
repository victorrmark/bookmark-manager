import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Bookmark } from "@/types/bookmark";
import { EllipsisVertical, Pin } from "lucide-react";
import Image from "next/image";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const url = new URL(bookmark.url).hostname;
  const imageSrc = bookmark.favicon_url;

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

        <div className="rounded-[6px] p-1.5 outline-2 outline-neutral-400 dark:outline-(--neutral-500)">
          <EllipsisVertical />
        </div>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <p className="text-neutral-800 dark:text-neutral-100">
          {bookmark.description}
        </p>
        <div className="flex flex-wrap gap-x-1.5 gap-y-[1px]">
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

      <CardFooter className="mt-auto">
        <div aria-label="bookmark info" className="flex flex-1 text-neutral-800 dark:text-neutral-100 gap-4">
          <p>{bookmark.visit_count}</p>
          <p>{bookmark.created_at}</p>
          <p>{bookmark.last_visited ? bookmark.last_visited : "Never"}</p>
        </div>

        {bookmark.is_pinned && (
          <Pin className="size-4 text-neutral-800 dark:text-neutral-100 mr-auto" />
        )}
      </CardFooter>
    </Card>
  );
}
