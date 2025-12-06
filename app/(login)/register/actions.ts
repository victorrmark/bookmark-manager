'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

interface FormData {
  name: string;
  email: string;
  password: string;
}

export async function signup(formData: FormData) {
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