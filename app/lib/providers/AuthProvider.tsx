'use client'

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import { createClient } from '../supabase/client'
import {AuthContextType} from "@/app/lib/models/authContext";
import {IUser} from "@/app/lib/models/User";

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    loading: true,
    isAdmin: false,
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    const supabase = useMemo(() => createClient(), [])

    const fetchProfile = useCallback(async (userId: string) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', userId)
                .single()

            if (!error && data) {
                setProfile(data as IUser)
            }
        } catch (err) {
            console.error('Error fetching user profile:', err)
        }
    }, [supabase])

    useEffect(() => {
        let isMounted = true

        const handleAuthChange = async (session: Session | null) => {
            const currentUser = session?.user ?? null

            if (isMounted) {
                setUser(currentUser)

                if (currentUser) {
                    await fetchProfile(currentUser.id)
                } else {
                    setProfile(null)
                }

                setLoading(false)
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
    }, [supabase, fetchProfile])

    const isAdmin = user?.app_metadata?.role === 'admin'

    return (
        <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}