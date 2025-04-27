import { type PropsWithChildren } from "react";

interface ContentSectionProps {
    className?: string
}

export function ContentSection({ children, className }: PropsWithChildren<ContentSectionProps>) {
    return (
        <div 
                className={`
                    py-6 md:py-10
                    bg-popover rounded-none 
                    shadow-none sm:shadow-xl border-border border-1
                    sm:h-auto
                    overflow-y-auto
                    h-full
                    flex flex-col
                    ${className}
                `}
            >
                {children}
        </div>
    )
}