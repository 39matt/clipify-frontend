import { createClient } from '@/app/lib/supabase/client'

export async function apiFetch(path: string, options: RequestInit = {}) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const headers = new Headers(options.headers)
    headers.set('Content-Type', 'application/json')

    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`)
    }

    return fetch(path, {
        ...options,
        headers,
    })
}