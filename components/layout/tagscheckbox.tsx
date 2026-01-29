"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useBookmarkContext } from "@/app/(dashboard)/BookmarkContext";
import { useEffect } from "react";

const filters = [
  { id: 1, label: "AI", value: "ai", badge: "10" },
  { id: 2, label: "Community", value: "community", badge: "5" },
  { id: 3, label: "CSS", value: "css", badge: "4" },
  { id: 4, label: "Design", value: "design", badge: "1" },
  { id: 5, label: "Framework", value: "framework", badge: "3" },
  { id: 6, label: "Git", value: "git", badge: "2" },
  { id: 7, label: "HTML", value: "html", badge: "5" },
  { id: 8, label: "JavaScript", value: "javascript", badge: "4" },
  { id: 9, label: "Layout", value: "layout", badge: "4" },
  { id: 10, label: "Learning", value: "learning", badge: "4" },
  { id: 11, label: "Performance", value: "performance", badge: "4" },
  { id: 12, label: "Practice", value: "practice", badge: "4" },
  { id: 13, label: "Reference", value: "reference", badge: "6" },
  { id: 14, label: "Tips", value: "tips", badge: "2" },
  { id: 15, label: "Tools", value: "tools", badge: "4" },
  { id: 16, label: "Tutorials", value: "tutorials", badge: "3" },
];

export function TagsCheckbox() {
  const { selectedId , setSelectedId } = useBookmarkContext();

  const handleCheckboxChange = (id: number) => {
    if (selectedId.includes(id)) {
      setSelectedId(selectedId.filter((selected) => selected !== id));
    } else {
      setSelectedId([...selectedId, id]);
    }
  };

  useEffect (() => {  
    console.log("Selected IDs:", selectedId);
  }, [selectedId]);

  return (
    <>
    <div className="w-full px-3 font-bold text-set5 text-[#4d4d4d] dark:text-neutral-100">TAGS</div>
    <div className="no-scrollbar overflow-y-auto px-2">
        {filters.map((filter) => (
          <div key={filter.value} className="flex items-center gap-3 w-full px-2 py-3">
            <Checkbox id={filter.value} checked={selectedId.includes(filter.id)} onCheckedChange={() => handleCheckboxChange(filter.id)} />
            <Label htmlFor={filter.value}>{filter.label}</Label>
            <div className="ml-auto rounded-full bg-neutral-100 dark:bg-(--neutral-600) border-2 border-neutral-300 dark:border-neutral-400 p-2 h-7 w-7 flex items-center justify-center text-set5 text-neutral-800 dark:text-white">{filter.badge}</div>
          </div>
        ))}
    </div>
    </>
  );
}
