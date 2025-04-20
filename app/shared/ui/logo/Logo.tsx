import { useTheme } from "next-themes";

export function Logo() {
    const { theme } = useTheme();
    const getThemedLogo = () => `/images/logo/${theme === "dark" ? "dark" : "light"}.svg`

    return (
        <img src={getThemedLogo()} alt="Snuppy Logo" className="max-h-6" />
    )
}