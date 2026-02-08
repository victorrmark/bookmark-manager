"use client";
// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, useWatch, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";
import { useCreateBookmark } from "@/hooks/useBookmark";
import type { BookmarkFormData, Tag } from "@/types/bookmark-data";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function AddBookmark() {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BookmarkFormData>({
    defaultValues: {
      tags: [],
    },
    shouldUnregister: true,
  });

  const { mutateAsync } = useCreateBookmark();

  const descriptionValue = useWatch({
    control,
    name: "description",
    defaultValue: "",
  });

  const TAGS: Tag[] = [
    { tag: "AI", id: 1 },
    { tag: "Community", id: 2 },
    { tag: "Compatibility", id: 3 },
    { tag: "CSS", id: 4 },
    { tag: "Design", id: 5 },
    { tag: "Framework", id: 6 },
    { tag: "Git", id: 7 },
    { tag: "HTML", id: 8 },
    { tag: "JavaScript", id: 9 },
    { tag: "Layout", id: 10 },
    { tag: "Learning", id: 11 },
    { tag: "Performance", id: 12 },
    { tag: "Practice", id: 13 },
    { tag: "Reference", id: 14 },
    { tag: "Tips", id: 15 },
    { tag: "Tools", id: 16 },
    { tag: "Tutorial", id: 17 },
  ];

  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef =  useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: BookmarkFormData) => {
    try {
      await mutateAsync(data);
      setDialogOpen(false);
      toast.success("Bookmark added successfully")
    } catch (err ) {
      const message = err instanceof Error ? err.message : "something went wrong";

      toast.error("Error adding bookmark", {
        duration: 3000,
        description: message ,
      });
      console.log(err)
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="
            flex items-center gap-2 cursor-pointer transition duration-300
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
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[570px] px-5 pt-6 pb-5 sm:p-8 sm:pb-5 h-[575px] overflow-scroll no-scrollbar">
        <DialogHeader>
          <DialogTitle className="text-set1 text-neutral-900 dark:text-white">
            Add a Bookmark
          </DialogTitle>
          <DialogDescription className="text-set-4 font-medium text-neutral-800 dark:text-neutral-100">
            Save a link with details to keep your collections organized.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-6"
        >
          <div aria-label="Add bookmark form" className="flex flex-col gap-2.5">
            <div>
              <label
                htmlFor="title"
                className="block text-set4 font-medium text-neutral-900 dark:text-white"
              >
                Title{" "}
                <span className="text-teal-700 dark:text-neutral-100">*</span>
                <input
                  type="text"
                  id="title"
                  className={`login-input ${
                    errors.title
                      ? "outline-red-800 dark:outline-red-600"
                      : "outline-neutral-500 dark:outline-neutral-300"
                  }`}
                  {...register("title", {
                    required: "Title field cannot be empty",
                  })}
                />
              </label>
              {errors.title && (
                <p
                  className="dark:text-red-600 text-red-800 text-set4 mt-1"
                  role="alert"
                >
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-set4 font-medium text-neutral-900 dark:text-white  "
              >
                Description{" "}
                <span className="text-teal-700 dark:text-neutral-100">*</span>
                <textarea
                  id="description"
                  rows={3}
                  className={`login-input ${
                    errors.description
                      ? "outline-red-800 dark:outline-red-600"
                      : "outline-neutral-500 dark:outline-neutral-300"
                  }`}
                  {...register("description", {
                    required: "Description field cannot be empty",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                    maxLength: {
                      value: 260,
                      message: `Maximum length is 260 characters`,
                    },
                    validate: (value) => {
                      const wordCount = value.trim().length;
                      return (
                        wordCount <= 260 ||
                        "Description must not exceed 260 words"
                      );
                    },
                    onChange: (e) => {
                      const value = e.target.value;

                      if (value.trim().length > 260) {
                        const trimmedValue = value.slice(0, 260);
                        e.target.value = trimmedValue;
                      }
                    },
                  })}
                />
              </label>
              <div className="mt-1 flex items-start">
                {errors.description && (
                  <p
                    className="dark:text-red-600 text-red-800 text-set4"
                    role="alert"
                  >
                    {errors.description.message}
                  </p>
                )}
                <span
                  className="text-set5 text-neutral-800 dark:text-neutral-100 ml-auto"
                  aria-label="Description character count"
                  aria-live="polite"
                >
                  {descriptionValue.length} / 260
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="url"
                className="block text-set4 font-medium text-neutral-900 dark:text-white"
              >
                Website URL{" "}
                <span className="text-teal-700 dark:text-neutral-100">*</span>
                <input
                  type="url"
                  id="url"
                  className={`login-input ${
                    errors.url
                      ? "outline-red-800 dark:outline-red-600"
                      : "outline-neutral-500 dark:outline-neutral-300"
                  }`}
                  {...register("url", {
                    required: "URL field cannot be empty",
                    validate: (value) => {
                      try {
                        new URL(value);
                        return true;
                      } catch {
                        return "Please enter a valid website URL";
                      }
                    },
                    onBlur: (e) => {
                      const value = e.target.value.trim();
                      if (value && !/^https?:\/\//i.test(value)) {
                        setValue("url", `https://${value}`, {
                          shouldValidate: true,
                        });
                      }
                      // console.log(getFaviconUrl(value));
                    },
                    pattern: {
                      value:
                        /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/,
                      message: "Please enter a valid website URL",
                    },
                  })}
                />
              </label>
              {errors.url && (
                <p
                  className="dark:text-red-600 text-red-800 text-set4 mt-1"
                  role="alert"
                >
                  {errors.url.message}
                </p>
              )}
            </div>

            <div className="relative" ref={containerRef}>
              <label className="block text-set4 font-medium text-neutral-900 dark:text-white">
                Tags{" "}
                <span className="text-teal-700 dark:text-neutral-100">*</span>
              </label>

              <Controller
                name="tags"
                control={control}
                rules={{
                  validate: (value) =>
                    value.length > 0 || "Select at least one tag",
                }}
                render={({ field }) => {
                  const filteredTags = TAGS.filter((tags) =>
                    tags.tag.toLowerCase().includes(search.toLowerCase())
                  );

                  return (
                    <>
                      {/* Input container */}
                      <div
                        onClick={() => setOpen(true)}
                        className={`min-h-[44px] flex flex-wrap items-center gap-1 px-3 py-2 outline rounded-md cursor-text mt-2 hover:bg-neutral-100 dark:hover:bg-(--neutral-500) dark:bg-(--neutral-600)  ${
                          errors.tags
                            ? "outline-red-800 dark:outline-red-600"
                            : "outline-neutral-500 dark:outline-neutral-300"
                        } ${
                          open
                            ? "ring-2 ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2"
                            : " "
                        }`}
                      >
                        {field.value?.map((tag) => (
                          <span
                            key={tag.id}
                            className="flex items-center gap-1 bg-teal-700 text-white px-2 py-1 rounded-full text-sm"
                          >
                            {tag.tag}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                field.onChange(
                                  field.value?.filter((t) => t.id !== tag.id)
                                );
                              }}
                              className="hover:text-red-300"
                            >
                              ×
                            </button>
                          </span>
                        ))}

                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          onFocus={() => setOpen(true)}
                          placeholder={
                            field.value?.length === 0 ? "Select tags…" : ""
                          }
                          className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
                        />
                      </div>

                      {/* Dropdown for tags */}
                      {open && (
                        <div className="absolute top-[-173] z-10 w-full bg-white dark:bg-neutral-800 outline-2 outline-teal-700 dark:outline-neutral-800 rounded-md shadow-lg max-h-48 overflow-auto">
                          {filteredTags.length === 0 && (
                            <p className="px-3 py-2 text-sm text-neutral-400">
                              No tags found
                            </p>
                          )}

                          {filteredTags.map((tags) => {
                            const selected = field.value
                              ?.map((t) => t.tag)
                              .includes(tags.tag);

                            return (
                              <button
                                key={tags.tag}
                                type="button"
                                onClick={() => {
                                  field.onChange(
                                    selected
                                      ? field.value?.filter(
                                          (t) => t.tag !== tags.tag
                                        )
                                      : [...field.value, tags]
                                  );
                                  setSearch("");
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-(--neutral-500) ${
                                  selected
                                    ? "bg-neutral-100 dark:bg-(--neutral-600) text-neutral-900 dark:text-white "
                                    : "text-neutral-800 dark:text-neutral-100"
                                }`}
                              >
                                {tags.tag}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  );
                }}
              />

              {errors.tags && (
                <p className="text-red-800 mt-1 text-sm">
                  {errors.tags.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="flex items-center w-full sm:justify-end">
            <DialogClose
              asChild
              className="flex-1 sm:flex-none focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2 "
            >
              <button className="cursor-pointer outline outline-neutral-400 rounded-xl px-4 py-3 hover:text-teal-700 dark:hover:text-neutral-100">
                Cancel
              </button>
            </DialogClose>

            <button
              className="flex-1 sm:flex-none cursor-pointer outline outline-neutral-400 rounded-xl px-4 py-3 bg-teal-700 text-white hover:bg-teal-800 focus:ring-2 focus:ring-teal-700 dark:ring-neutral-100 ring-offset-white dark:ring-offset-neutral-800 ring-offset-2"
              // className="auth-Btn"
              type="submit"
              aria-label="Add Bookmark"
              aria-busy={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Bookmark"}
            </button>
            {/* <Button type="submit">Save changes</Button> */}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
