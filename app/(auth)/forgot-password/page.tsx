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

interface LoginFormData {
    email: string;
}

export default function ForgotPasswordPage() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormData>();

    const [openDialog, setOpenDialog] = useState(false);

    const sendResetLink = async (data: LoginFormData) => {

        const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
            redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
        });
        if (error) {
            toast.error("An error occurred while sending the reset link. Please try again later.", {
                duration: 4000,
                position: "top-right",
            });
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
                            Forgot your password?
                        </p>
                        <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
                            Enter your email address below and we’ll send you a link to reset your password.
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
                                Email <span className="text-teal-700 dark:text-neutral-100">*</span>
                                <input
                                    type="text"
                                    id="email"
                                    className={`login-input ${errors.email
                                        ? "outline-red-800 dark:outline-red-600"
                                        : "outline-neutral-500 dark:outline-neutral-300"
                                        }`}
                                    {...register("email", {
                                        required: "Email address is required",
                                    })}
                                />
                            </label>
                            {errors.email && (
                                <p
                                    className="dark:text-red-600 text-red-800 text-set4 mt-2"
                                    role="alert"
                                >
                                    {errors.email.message}
                                </p>
                            )}
                        </div>



                        <button
                            className="auth-Btn"
                            aria-label="Create account"
                            aria-busy={isSubmitting}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Sending link..." : "Send reset link"}
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
                            Reset Link Sent!

                        </DialogTitle>

                        <DialogDescription className="flex flex-col items-center ">
                            <span className="text-center dark:text-neutral-100">
                                We’ve sent a password reset link to your email.
                            </span>
                            <span className="text-center dark:text-neutral-100">
                                Open your inbox and click the link to reset your password.
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
