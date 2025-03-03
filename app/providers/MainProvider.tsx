"use client"

import { type PropsWithChildren } from "react";
import { TanstackQueryProvider } from "./TanstackQueryProvider";

export function MainProvider({ children }: PropsWithChildren) {
    return (
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
    )
}