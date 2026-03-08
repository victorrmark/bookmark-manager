'use client';
import { createContext, useContext, useState } from "react";
import type { Bookmark } from "@/types/bookmark";


interface BookmarkContextType {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    selectedId: SelectIDType[];
    setSelectedId: React.Dispatch<React.SetStateAction<SelectIDType[]>>;
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    activeCard: Bookmark | null;
    setActiveCard: React.Dispatch<React.SetStateAction<Bookmark | null>>;
    archiveId: string;
    setArchiveId: React.Dispatch<React.SetStateAction<string>>;
    showArchiveDialog: boolean;
    setShowArchiveDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SelectIDType {
    id: number;
    tag: string;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: React.ReactNode }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedId, setSelectedId] = useState<SelectIDType[]>([]);
    const [sortBy, setSortBy] = useState<string>("recent");
    const [activeCard, setActiveCard] = useState<Bookmark | null>(null);
    const [archiveId, setArchiveId] = useState<string>('');
    const [showArchiveDialog, setShowArchiveDialog] = useState<boolean>(false);


    return (
        <BookmarkContext.Provider
            value={{ searchQuery, setSearchQuery, selectedId, setSelectedId, sortBy, setSortBy, activeCard, setActiveCard, archiveId, setArchiveId, showArchiveDialog, setShowArchiveDialog }}
        >
            {children}
        </BookmarkContext.Provider>
    );
}

export const useBookmarkContext = () => {
    const context = useContext(BookmarkContext);
    if (!context) throw new Error("useBookmarkContext must be used within a BookmarkProvider");
    return context;
};