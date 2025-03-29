import { type PropsWithChildren } from "react";

interface ContentSectionProps {
    className?: string
}

export function ContentSection({ children, className }: PropsWithChildren<ContentSectionProps>) {
    return (
        <div 
                className={`
                    sm:pt-8 bg-white rounded-none 
                    shadow-none sm:shadow-xl sm:shadow-indigo-50
                    sm:h-auto pt-6
                    flex flex-col
                    lg:max-h-[75vh]
                    ${className}
                `}
            >
                {children}
        </div>
    )
}