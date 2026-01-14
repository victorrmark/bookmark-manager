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
import Image from "next/image";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const url = new URL(bookmark.url).hostname;
  const imageSrc = bookmark.favicon_url;
  return (
    <Card>
      <CardHeader>
        <div className="flex">
          <Image
            src={imageSrc}
            width={20}
            height={20}
            alt={`${bookmark.title} favicon`}
            className="outline-red-500 outline w-11 h-11 rounded-xl "
          />
          <div>
            <CardTitle>{bookmark.title}</CardTitle>
            <CardDescription>{url}</CardDescription>
          </div>
        </div>
        {/* <CardAction>Card Action</CardAction> */}
      </CardHeader>
      <CardContent>
        <p>{bookmark.description}</p>
      </CardContent>
      <CardFooter>
        <p>{bookmark.visit_count}</p>
        <p>{bookmark.created_at}</p>
        <p>{bookmark.last_visited ? bookmark.last_visited : "Never"}</p>
      </CardFooter>
    </Card>
  );
}
