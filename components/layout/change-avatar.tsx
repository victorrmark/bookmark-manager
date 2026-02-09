
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
import { useUpdateAvatar } from "@/hooks/useUpdateAvatar"
import { toast } from 'sonner';

interface ChangeAvatarProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    userId: string | undefined;
}

export default function ChangeAvatar({ open, setOpen, userId }: ChangeAvatarProps) {
    const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
    const updateAvatar = useUpdateAvatar()

    const handleAvatarSelect = (avatarID: string) => {
        setSelectedAvatar(avatarID);
    }

    const handleAvatarChange = async () => {
        if (!selectedAvatar) return;
        try {

            await updateAvatar(selectedAvatar, userId);
            setOpen(false);
            toast.success("Avatar updated successfully!");
        } catch (error) {
            console.error("Failed to update avatar:", error);
            toast.error("Failed to update avatar. Please try again.");
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[450px] gap-8">
                <DialogHeader>
                    <DialogTitle className="text-set1 text-neutral-900 dark:text-white">
                        Change avatar
                    </DialogTitle>
                    <DialogDescription className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
                        Pick your desired avatar.
                    </DialogDescription>
                </DialogHeader>

                <div className='w-full flex gap-5 flex-wrap justify-center'>
                    {AVATARS.map((avatar, index) => (
                        <Avatar
                            key={index}
                            className={`${selectedAvatar === avatar.id ? "ring-2 ring-teal-700 dark:ring-neutral-100" : ""} size-24 cursor-pointer ring-offset-white dark:ring-offset-(--neutral-800) ring-offset-2 rounded-full`}
                            onClick={() => handleAvatarSelect(avatar.id)}
                        >
                            <AvatarImage src={avatar.src} alt={avatar.id} />
                        </Avatar>
                    ))}
                </div>

                <DialogFooter className="flex sm:items-center sm:justify-end gap-8">
                    <DialogClose
                        asChild
                        className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-neutral-400 dark:border-neutral-400 cursor-pointer hover:text-teal-700 dark:hover:text-neutral-100"
                    >
                        <Button >Cancel</Button>
                    </DialogClose>
                    <Button
                        onClick={handleAvatarChange}
                        type="submit"
                        disabled={!selectedAvatar}
                        className=" text-set3 flex-1 sm:flex-initial px-5 py-2.5 bg-teal-700 hover:bg-teal-800 cursor-pointer text-white"
                    >
                        Change Avatar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
