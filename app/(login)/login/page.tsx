"use client";
import Image from "next/image";
import Link from "next/link";
import LogoLight from "@/public/logo-light-theme.svg";
import LogoDark from "@/public/logo-dark-theme.svg";
import { useForm } from "react-hook-form";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
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
            Log in to your account
          </p>
          <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div>
            <label
              htmlFor="email"
              className="block text-set4 font-bold text-neutral-900 dark:text-white"
            >
              Email
              <input
                type="text"
                id="email"
                className={`login-input ${
                  errors.email
                    ? "outline-red-800 dark:outline-red-600"
                    : "outline-neutral-500 dark:outline-neutral-300"
                }`}
                {...register("email", {
                  required: "Email address is required",
                })}
              />
            </label>
            {errors.email && (
              <p className="dark:text-red-600 text-red-800 text-set4 mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-set4 font-bold text-neutral-900 dark:text-white "
            >
              Password
              <input
                type="password"
                id="password"
                className={`login-input ${
                  errors.password
                    ? "outline-red-800 dark:outline-red-600"
                    : "outline-neutral-500 dark:outline-neutral-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
            </label>
              {errors.password && (
                <p className="dark:text-red-600 text-red-800 text-set4 mt-2">
                  {errors.password.message}
                </p>
              )}
          </div>
          <button className="bg-teal-700 hover:bg-teal-800 w-full rounded-lg py-3 px-4 cursor-pointer text-set3 text-white focus:ring-2 focus:ring-teal-700 ring-offset-3">
            Log in
          </button>
        </form>

        <div className="flex flex-col items-center w-full gap-3">
          <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
            Forgot password?{" "}
            <Link href="/forgot-password" className="login-links">
              Reset it
            </Link>{" "}
          </p>
          <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
            Don't have an account?{" "}
            <Link href="/register" className="login-links">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
