import React from 'react'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '../ui/button';
import { AVATARS } from '@/lib/avatar';
import { useState } from 'react';

interface ChangeAvatarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function ChangeAvatar({ open, setOpen }: ChangeAvatarProps) {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const handleAvatarSelect = (avatarID: string) => {
        console.log("Selected avatar URL:", avatarID);
        setOpen(false);
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[450px] gap-6">
                <DialogHeader>
                    <DialogTitle className="text-set1 text-neutral-900 dark:text-white">
                        Change avatar
                    </DialogTitle>
                    <DialogDescription className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
                        Pick your desired avatar.
                    </DialogDescription>
                </DialogHeader>

                <div className='w-full flex gap-3'>
                    {AVATARS.map((avatarUrl, index) => (
                        <Avatar key={index} className='size-16 cursor-pointer hover:ring-2 hover:ring-teal-700 dark:hover:ring-neutral-100 ring-offset-white dark:ring-offset-(--neutral-800) ring-offset-2 rounded-full'>
                            <AvatarImage src={avatarUrl.src} alt={avatarUrl.id} />
                        </Avatar>
                    ))}
                    </div>

                <DialogFooter className="flex sm:items-center sm:justify-end gap-8">
                    {/* <DialogClose
                        asChild
                        className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-neutral-400 dark:border-neutral-400 cursor-pointer hover:text-teal-700 dark:hover:text-neutral-100"
                    > */}
                    {/* <Button disabled={isDeleting}>Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={() => deleteBookmark(deleteId)}
                        type="submit"
                        disabled={isDeleting}
                        className=" text-set3 flex-1 sm:flex-initial px-5 py-2.5 bg-red-800 hover:bg-red-900 cursor-pointer text-white"
                    >
                        {isDeleting ? "Deleting..." : "Delete permanently"}
                    </Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
