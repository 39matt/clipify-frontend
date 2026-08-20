import { createClient } from '@/app/lib/supabase/client'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

export async function apiFetch(path: string, options: RequestInit = {}) {
    const supabase = createClient()

    let { data: { session } } = await supabase.auth.getSession()

    if (session && session.expires_at && session.expires_at * 1000 < Date.now()) {
        const { data: refreshed } = await supabase.auth.refreshSession()
        session = refreshed.session
    }

    const headers = new Headers(options.headers)

    if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
    }

    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`)
    }

    const endpoint = `${BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`

    return await fetch(endpoint, {
        ...options,
        headers,
    })
}