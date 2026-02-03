"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useBookmark, useArchives } from "@/hooks/useBookmark";
import { useBookmarkContext } from "@/app/(dashboard)/BookmarkContext";
import { usePathname } from "next/navigation";
import { tagsArray } from "@/lib/tags";

interface FilterType {
  id: number;
  tag: string;
  value: string;
  badge: number;
}


export function TagsCheckbox() {

  const pathname = usePathname();
  const { selectedId, setSelectedId } = useBookmarkContext();
  const { data: bookmarks = [] } = useBookmark();
  const { data: archives = [] } = useArchives();

  const activeBookmarks = pathname === "/home" ? bookmarks : archives;

  const allTags = activeBookmarks.flatMap(bookmark => bookmark.bookmark_tags.map(bt => bt.tags));
  const tagCountMap = allTags.reduce<Record<string, number>>((acc, tag) => {
    acc[tag.tag] = (acc[tag.tag] || 0) + 1;
    return acc;
  }, {});


  const filters: FilterType[] = tagsArray.map(tagObj => ({
    ...tagObj,
    value: tagObj.tag.toLowerCase(),
    badge: tagCountMap[tagObj.tag] || 0,
  }))

  const handleCheckboxChange = (filter: FilterType) => {
    const exists = selectedId.find((selected) => selected.id === filter.id);
    if (exists) {
      setSelectedId(selectedId.filter((selected) => selected.id !== filter.id))
    } else {
      setSelectedId([...selectedId, { id: filter.id, tag: filter.tag }])
    }
  };

  const checked = (id: number) => {
    return selectedId.some((selected) => selected.id === id);
  }


  return (
    <>
      <div className="w-full px-3 font-bold text-set5 text-[#4d4d4d] dark:text-neutral-100">TAGS</div>
      <div className="no-scrollbar overflow-y-auto px-2">
        {filters.map((filter) => (
          <div key={filter.value} className="flex items-center gap-3 w-full px-2 py-3">
            <Checkbox id={filter.value} checked={checked(filter.id)} onCheckedChange={() => handleCheckboxChange(filter)} />
            <Label htmlFor={filter.value}>{filter.tag}</Label>
            <div className="ml-auto rounded-full bg-neutral-100 dark:bg-(--neutral-600) border-2 border-neutral-300 dark:border-neutral-400 p-2 h-7 w-7 flex items-center justify-center text-set5 text-neutral-800 dark:text-white">{filter.badge}</div>
          </div>
        ))}
      </div>
    </>
  );
}
