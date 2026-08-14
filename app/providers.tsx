'use client';

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import {AuthProvider} from "@/app/lib/providers/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider value={defaultSystem}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ChakraProvider>
    );
}