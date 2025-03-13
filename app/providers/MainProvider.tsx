"use client"

import { Suspense, type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { AuthProvider } from "./AuthProvider";

export function MainProvider({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={null}>
            <AuthProvider>
                <TanstackQueryProvider>{children}</TanstackQueryProvider>
            </AuthProvider>
        </Suspense>
    )
}