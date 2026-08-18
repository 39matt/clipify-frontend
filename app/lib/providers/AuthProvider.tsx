'use client'

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { createClient } from '../supabase/client'
import { AuthContextType } from "@/app/lib/models/authContext"
import { IUser } from "@/app/lib/models/User"

const AuthContext = createContext<AuthContextType>({
    supabaseUser: null,
    user: null,
    loading: true,
    isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [supabaseUser, setSupabaseUser] = useState<User | null>(null)
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    const supabase = useMemo(() => createClient(), [])

    const fetchUser = useCallback(async (token: string) => {
        try {
            const res = await fetch('/api/users/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (res.ok) {
                const userData = await res.json()
                setUser(userData)
            } else {
                setUser(null)
            }
        } catch (err) {
            console.error('Error fetching user profile from Go API:', err)
            setUser(null)
        }
    }, [])

    useEffect(() => {
        let isMounted = true

        const handleAuthChange = async (session: Session | null) => {
            const currentUser = session?.user ?? null

            if (isMounted) {
                setSupabaseUser(currentUser)

                if (session?.access_token) {
                    await fetchUser(session.access_token)
                } else {
                    setUser(null)
                }

                setLoading(false)
            }

            if (currentUser) {
                const { data } = await supabase.auth.getClaims()
                setIsAdmin(data?.claims?.user_role === 'admin')
            } else {
                setIsAdmin(false)
            }
        }

        supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
            handleAuthChange(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event: AuthChangeEvent, session: Session | null) => {
            handleAuthChange(session)
        })

        return () => {
            isMounted = false
            subscription.unsubscribe()
        }
    }, [supabase, fetchUser])

    return (
        <AuthContext.Provider value={{ supabaseUser, user, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}