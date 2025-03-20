import { type PropsWithChildren } from "react";

interface ContentSectionProps {
    className?: string
}

export function ContentSection({ children, className }: PropsWithChildren<ContentSectionProps>) {
    return (
        <div 
                className={`
                    w-full sm:max-w-lg sm:py-10 bg-white rounded-none sm:rounded-4xl 
                    shadow-none sm:shadow-xl sm:shadow-indigo-50
                    sm:h-auto pt-8 pb-8
                    overflow-y-auto
                    ${className}
                `}
            >
                {children}
        </div>
    )
}