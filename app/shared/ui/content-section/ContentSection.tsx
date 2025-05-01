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
                    overflow-y-auto
                    flex flex-col
                    ${className}
                `}
            >
                {children}
        </div>
    )
}