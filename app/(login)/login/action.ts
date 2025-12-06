'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface FormData {
  email: string;
  password: string;
}

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
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
