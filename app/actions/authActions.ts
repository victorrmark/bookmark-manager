"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from 'next/cache'

interface LoginType {
  email: string;
  password: string;
}

interface RegisterType extends LoginType {
  name: string;
}

export async function loginAction(formData: LoginType) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
//   return { success: true }
}

export async function signupAction(formData: RegisterType) {
  const supabase = await createClient()

  const data = {
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        display_name: formData.name,
      },
    },
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logoutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();
  if (error) {
    // console.log("Error logging out:", error.message);
    return {error: error.message};
  }
  redirect("/login");
};