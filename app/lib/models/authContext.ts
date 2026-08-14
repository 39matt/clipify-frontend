import {User} from "@supabase/supabase-js";
import {IUser} from "@/app/lib/models/User";

export interface AuthContextType {
    user: User | null
    profile: IUser | null
    loading: boolean
    isAdmin: boolean
}