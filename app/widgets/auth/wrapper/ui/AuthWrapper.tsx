"use client"

import { type PropsWithChildren } from "react";


export function AuthWrapper({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen sm:h-full sm:py-2 bg-gray-50">
            <div 
                className="
                    w-full sm:max-w-lg sm:py-10 bg-white rounded-none sm:rounded-4xl 
                    shadow-none sm:shadow-xl sm:shadow-indigo-50 overflow-hidden
                    h-screen sm:h-auto pt-16
                "
            >
                {children}
            </div>
        </div>
    )
}