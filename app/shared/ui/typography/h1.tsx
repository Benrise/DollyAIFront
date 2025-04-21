export function H1({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h1 className={`text-3xl md:text-4xl xl:text-5xl leading-[1.3] font-semibold ${className}`}>
            {children}
        </h1>
    )
}