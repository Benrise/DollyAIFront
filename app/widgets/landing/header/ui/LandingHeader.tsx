import NextLink from "next/link";

import { Button } from "@/app/shared/ui/button";
import { ThemeToggle } from "@/app/shared/ui/theme-toggle";
import { Separator } from "@/app/shared/ui/separator"
import { Link } from "@/app/shared/ui/link/Link";
import { useTheme } from "next-themes";


export function LandingHeader() {

    const { theme } = useTheme();

    return (
        <header className="w-full flex items-center justify-between">
            {/* left */}
            <div className="flex items-center gap-8">
                <NextLink href="/">
                    <img src={`/images/logo/${theme === "dark" ? "dark" : "light"}.svg`} alt="Snuppy Logo" className="max-h-6" />
                </NextLink>
                <nav className="hidden md:flex items-center gap-8">
                    <Link label="Use cases"/>
                    <Link label="Demo"/>
                    <Link label="Pricing"/>
                    <Link label="FAQ"/>
                </nav>
            </div>
            {/* right */}
            <div className="flex items-center gap-4">
                <ThemeToggle className="hidden md:flex"/>
                <Separator orientation="vertical" className="h-6! hidden md:flex"/>
                <Button
                    variant="ghost"
                    asChild
                    className="hidden md:flex"
                >
                    <NextLink href="/pages/auth/login">Log in</NextLink>
                </Button>
                <Button
                    variant="default"
                    asChild
                >
                <NextLink href="/pages/auth/register">Try for free</NextLink>
                </Button>
            </div>
        </header>
    );
}