// import { ArrowDownUp } from "lucide-react";

export default async function Home() {
  return (
    <>
      {Array.from({ length: 30 }).map((_, index) => (
        <div
          key={index}
          className="w-[100px] h-[100px] outline outline-red-500"
        >
          Bookmark {index + 1}
        </div>
      ))}
    </>
  );
}
