export function Body({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={`text-[0.875rem] md:text-lg xl:text-xl font-medium ${className}`}>
            {children}
        </div>
    )
}