import {User} from "@supabase/supabase-js";
import {IUser} from "@/app/lib/models/User";

export interface AuthContextType {
    supabaseUser: User | null
    user: IUser | null
    loading: boolean
    isAdmin: boolean
}