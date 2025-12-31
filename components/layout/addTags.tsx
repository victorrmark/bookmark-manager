import { useForm, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";


function TagsForm() {
  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tags: [],
    },
  });


  const TAGS = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "GraphQL"];


  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef(null);

  /* ✅ Close dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setOpen(false);
        setSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-set4 font-medium">
        Tags <span className="text-teal-700">*</span>
      </label>

      <Controller
        name="tags"
        control={control}
        rules={{
          validate: (value) =>
            value.length > 0 || "Select at least one tag",
        }}
        render={({ field }) => {
          const filteredTags = TAGS.filter((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          );

          return (
            <>
              {/* Input container */}
              <div
                onClick={() => setOpen(true)}
                className={`min-h-[44px] flex flex-wrap items-center gap-2 px-3 py-2 border rounded-md cursor-text ${
                  errors.tags
                    ? "border-red-600"
                    : "border-neutral-400"
                }`}
              >
                {field.value?.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-teal-700 text-white px-2 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        field.onChange(
                          field.value?.filter((t) => t !== tag)
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
                    field.value?.length === 0
                      ? "Select tags…"
                      : ""
                  }
                  className="flex-1 min-w-[120px] outline-none bg-transparent text-sm"
                />
              </div>

              {/* Dropdown */}
              {open && (
                <div className="absolute z-10 mt-1 w-full bg-white dark:bg-neutral-800 border rounded-md shadow-lg max-h-48 overflow-auto">
                  {filteredTags.length === 0 && (
                    <p className="px-3 py-2 text-sm text-neutral-400">
                      No tags found
                    </p>
                  )}

                  {filteredTags.map((tag) => {
                    const selected = field.value?.includes(tag);

                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          field.onChange(
                            selected
                              ? field.value.filter(
                                  (t) => t !== tag
                                )
                              : [...field.value, tag]
                          );
                          setSearch("");
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-700 ${
                          selected
                            ? "bg-teal-700 text-white"
                            : ""
                        }`}
                      >
                        {tag}
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
  );
}
