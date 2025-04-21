import { type PropsWithChildren } from "react";

interface ContentSectionProps {
    className?: string
}

export function ContentSection({ children, className }: PropsWithChildren<ContentSectionProps>) {
    return (
        <div 
                className={`
                    py-10
                    bg-popover rounded-none 
                    shadow-none sm:shadow-xl border-border border-1
                    sm:h-auto
                    flex flex-col
                    ${className}
                `}
            >
                {children}
        </div>
    )
}