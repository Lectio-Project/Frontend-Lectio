'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, value: string) {
    const expirationTime = Date.now() + (8 * 60 * 60 * 1000);
    cookies().set(name, value, { expires: expirationTime });
}

export async function getCookie(name: string) {
    const data = cookies().get(name);
    return data?.value;
}

export async function deleteCookie(name: string) {
    cookies().delete(name);
}