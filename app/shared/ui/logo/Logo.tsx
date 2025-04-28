import { useTheme } from "next-themes";


export function Logo({ className, type = "default" }: { className?: string, type?: 'default' | 'compact' }) {
    const { theme } = useTheme();
    const getDefaultLogo = () => `/images/logo/${theme === "dark" || theme === "system" ? "dark" : "light"}.svg`

    return (
        type === "compact" ? <img src="/images/logo/compact.svg" alt="Snuppy Logo" className={`max-h-6 ${className}`} /> : <img src={getDefaultLogo()} alt="Snuppy Logo" className={`max-h-6 ${className}`} />
    )
}