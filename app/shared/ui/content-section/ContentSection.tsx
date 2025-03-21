import { type PropsWithChildren } from "react";

interface ContentSectionProps {
    className?: string
}

export function ContentSection({ children, className }: PropsWithChildren<ContentSectionProps>) {
    return (
        <div 
                className={`
                    sm:py-10 bg-white rounded-none 
                    shadow-none sm:shadow-xl sm:shadow-indigo-50
                    sm:h-auto pt-8 pb-8
                    flex flex-col
                    overflow-auto
                    ${className}
                `}
            >
                {children}
        </div>
    )
}