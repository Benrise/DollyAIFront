"use client"

import { Suspense, type PropsWithChildren } from "react";
import { ConfigProvider } from 'antd';
import { theme } from '@/app/theme.config';
import { TanstackQueryProvider } from "./TanstackQueryProvider";
import { AuthProvider } from "./AuthProvider";
import { UserProvider } from "./UserProvider";

export function MainProvider({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={null}>
            <AuthProvider>
                    <TanstackQueryProvider>
                        <ConfigProvider theme={theme}>
                            <UserProvider>
                                {children}
                            </UserProvider>
                        </ConfigProvider>
                    </TanstackQueryProvider>
            </AuthProvider>
        </Suspense>
    )
}