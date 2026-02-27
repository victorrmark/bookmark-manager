"use client";
import Image from "next/image";
import Link from "next/link";
import LogoLight from "@/public/logo-light-theme.svg";
import LogoDark from "@/public/logo-dark-theme.svg";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
// import { watch } from "fs/promises";

interface FormData {
    password: string;
    confirmPassword: string;
}

export default function ResetPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        trigger,
        getValues,
    } = useForm<FormData>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const [openDialog, setOpenDialog] = useState(false);

    const sendResetLink = async (data: FormData) => {
        const { error } = await supabase.auth.updateUser({ password: data.confirmPassword })
        if (error) {
            toast.error("An error occurred. Please try again later.", {
                duration: 4000,
                position: "top-right",
            });
            console.log(error)
        } else {
            setOpenDialog(true);
        }
    };


    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-neutral-100 font-manrope py-4 w-full px-4 dark:bg-neutral-900">
                <div className="py-5 px-5 sm:py-8 sm:px-9 w-md  rounded-xl flex flex-col gap-8 bg-white dark:bg-neutral-800 dark:outline-neutral-500">
                    <Image
                        src={LogoLight}
                        alt="Bookmark Manger Logo"
                        width={170}
                        height={50}
                        className="dark:hidden"
                    />
                    <Image
                        src={LogoDark}
                        alt="Bookmark Manger Logo"
                        width={170}
                        height={50}
                        className="hidden dark:block"
                    />

                    <div>
                        <p className="text-set1 font-bold text-neutral-900 dark:text-white">
                            Reset Your password?
                        </p>
                        <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
                            Enter your new password below. Make sure it’s strong and secure.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(sendResetLink)}
                        className="flex flex-col gap-4"
                        noValidate
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-set4 font-bold text-neutral-900 dark:text-white"
                            >
                                New Password <span className="text-teal-700 dark:text-neutral-100">*</span>
                                <input
                                    type="password"
                                    id="password"
                                    className={`login-input ${errors.password
                                        ? "outline-red-800 dark:outline-red-600"
                                        : "outline-neutral-500 dark:outline-neutral-300"
                                        }`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
                                        },
                                        onChange: () => trigger("confirmPassword"),
                                    })}
                                />
                            </label>
                            {errors.password && (
                                <p
                                    className="dark:text-red-600 text-red-800 text-sm mt-2"
                                    role="alert"
                                >
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-set4 font-bold text-neutral-900 dark:text-white"
                            >
                                Confirm Password <span className="text-teal-700 dark:text-neutral-100">*</span>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    className={`login-input ${errors.confirmPassword
                                        ? "outline-red-800 dark:outline-red-600"
                                        : "outline-neutral-500 dark:outline-neutral-300"
                                        }`}
                                    {...register("confirmPassword", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long",
                                        },
                                        validate: (value) =>
                                            value === getValues("password") || "Passwords do not match",
                                    })}
                                />
                            </label>
                            {errors.confirmPassword && (
                                <p
                                    className="dark:text-red-600 text-red-800 text-sm mt-2"
                                    role="alert"
                                >
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        <button
                            className="auth-Btn"
                            aria-label="Create account"
                            aria-busy={isSubmitting}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Resetting password..." : "Reset Password"}
                        </button>
                    </form>

                    <div className="flex flex-col items-center w-full gap-3">

                        <Link href="/login" className="text-set4 font-medium login-links">
                            Back to login
                        </Link>{" "}

                    </div>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="w-96 flex flex-col items-center gap-6">
                    <DialogHeader>
                        <DialogTitle className="flex flex-col items-center gap-4">
                            <DotLottieReact
                                src="https://lottie.host/21474716-2680-4e90-93e5-d59e059282ee/089NmxurB0.lottie"
                                loop={false}
                                autoplay
                                className="w-40 mx-auto"
                            />
                            Password Changed!

                        </DialogTitle>

                        <DialogDescription className="flex flex-col items-center ">
                            <span className="text-center dark:text-neutral-100">
                                Your password has been successfully changed.
                            </span>
                            <span className="text-center dark:text-neutral-100">
                                You can now log in with your new password.
                            </span>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose
                            asChild
                            className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-neutral-400 dark:border-neutral-400 cursor-pointer hover:text-teal-700 dark:hover:text-neutral-100"
                        >
                            <Button >Close</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>

    );
}
