"use client"

import { Suspense, type PropsWithChildren } from "react";
import { ConfigProvider } from 'antd';
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserProvider";
import { ThemeProvider } from "./ThemeProvider";

export function MainProvider({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={null}>
            <ThemeProvider 
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <AuthProvider>
                    <TanstackQueryProvider>
                        <ConfigProvider>
                            <UserProvider>
                                {children}
                            </UserProvider>
                        </ConfigProvider>
                    </TanstackQueryProvider>
                </AuthProvider>
            </ThemeProvider>
        </Suspense>  
    )
}