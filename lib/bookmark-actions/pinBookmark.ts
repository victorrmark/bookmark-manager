import { toast } from "sonner";
import { Pin } from "lucide-react";

  export const pinBookmarkAction = async (id, mutateAsync, isPinned) => {
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
      console.log(err);
    }
  };