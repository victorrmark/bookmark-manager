"use client";

import Image from "next/image";
import Link from "next/link";
import LogoLight from "@/public/logo-light-theme.svg";
import LogoDark from "@/public/logo-dark-theme.svg";
import { useForm } from "react-hook-form";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
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
            Create your account
          </p>
          <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
            Join us and start saving your favorite links - organized,
            searchable, and always within reach.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div>
            <label
              htmlFor="name"
              className="block text-set4 font-bold text-neutral-900 dark:text-white"
            >
              Full name *
              <input
                type="text"
                id="name"
                className={`login-input ${
                  errors.name
                    ? "outline-red-800 dark:outline-red-600"
                    : "outline-neutral-500 dark:outline-neutral-300"
                }`}
                {...register("name", {
                  required: "Full name is required",
                })}
              />
            </label>
            {errors.name && (
              <p className="text-red-800 dark:text-red-600 text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-set4 font-bold text-neutral-900 dark:text-white "
            >
              Email address *
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
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
            </label>
            {errors.email && (
              <p className="dark:text-red-600 text-red-800 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-set4 font-bold text-neutral-900 dark:text-white "
            >
              Password *
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
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />
            </label>
            {errors.password && (
              <p className="dark:text-red-600 text-red-800 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>
          <button className="bg-teal-700 hover:bg-teal-800 w-full rounded-lg py-3 px-4 cursor-pointer text-set3 text-white focus:ring-2 focus:ring-teal-700 ring-offset-3">
            Create account
          </button>
        </form>

        <div className="flex flex-col items-center w-full gap-3">
          <p className="text-set4 font-medium text-neutral-800 dark:text-neutral-100">
            Already have an account?{" "}
            <Link href="/login" className="login-links">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
