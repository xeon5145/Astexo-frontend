'use server'

import { cookies } from 'next/headers'

export async function setAuthCookie(accountType: number) {
  cookies().set({
    name: 'account_type',
    value: accountType.toString(),
    httpOnly: false, // Needs to be false if you want client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })
}

export async function deleteAuthCookie() {
  cookies().delete('account_type')
}
