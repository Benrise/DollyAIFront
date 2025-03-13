"use client"

import { type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { AuthProvider } from "./AuthProvider";

export function MainProvider({ children }: PropsWithChildren) {
    return (
        <AuthProvider>
            <TanstackQueryProvider>{children}</TanstackQueryProvider>
        </AuthProvider>
    )
}