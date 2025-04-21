export function H1({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl leading-[1.3] font-semibold">
            {children}
        </h1>
    )
}