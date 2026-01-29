'use client';
import { createContext, useContext, useState } from "react";

// type SortBy = "recent" | "lastVisited" | "mostVisited";

interface BookmarkContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedId: number[];
    setSelectedId: (ids: number[]) => void;
    sortBy: string;
    setSortBy: (sortBy: string) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState<number[]>([]);
    const [sortBy, setSortBy] = useState<string>("recent");

    return (
        <BookmarkContext.Provider value={{ searchQuery, setSearchQuery, selectedId, setSelectedId, sortBy, setSortBy }}>
            {children}
        </BookmarkContext.Provider>
    );
}

export const useBookmarkContext = () => {
    const context = useContext(BookmarkContext);
    if (!context) throw new Error("useBookmarkContext must be used within a BookmarkProvider");
    return context;
};