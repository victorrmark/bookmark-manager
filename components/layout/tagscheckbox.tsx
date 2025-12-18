"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
// import { SidebarMenuItem } from "@/components/ui/sidebar";

const filters = [
  { label: "AI", value: "ai", badge: "10" },
  { label: "Community", value: "community", badge: "5" },
  { label: "CSS", value: "css", badge: "4" },
  { label: "Design", value: "design", badge: "1" },
  { label: "Framework", value: "framework", badge: "3" },
  { label: "Git", value: "git", badge: "2" },
  { label: "HTML", value: "html", badge: "5" },
  { label: "JavaScript", value: "javascript", badge: "4" },
  { label: "Layout", value: "layout", badge: "4" },
  { label: "Learning", value: "learning", badge: "4" },
  { label: "Performance", value: "performance", badge: "4" },
  { label: "Practice", value: "practice", badge: "4" },
  { label: "Reference", value: "reference", badge: "6" },
  { label: "Tips", value: "tips", badge: "2" },
  { label: "Tools", value: "tools", badge: "4" },
  { label: "Tutorials", value: "tutorials", badge: "3" },
];

export function TagsCheckbox() {
  return (
    <>
    <div className="w-full px-3 font-bold text-set5 text-[#4d4d4d] dark:text-neutral-100">TAGS</div>
    <div className="no-scrollbar max-h-96 overflow-y-auto">
        {filters.map((filter) => (
          <div key={filter.value} className="flex items-center gap-3 w-full px-2 py-3">
            <Checkbox id={filter.value} />
            <Label htmlFor={filter.value}>{filter.label}</Label>
            <div className="ml-auto rounded-full bg-neutral-100 dark:bg-(--neutral-600) border-2 border-neutral-300 dark:border-neutral-400 p-2 h-7 w-7 flex items-center justify-center text-set5 text-neutral-800 dark:text-white">{filter.badge}</div>
          </div>
        ))}
    </div>
    </>
  );
}
